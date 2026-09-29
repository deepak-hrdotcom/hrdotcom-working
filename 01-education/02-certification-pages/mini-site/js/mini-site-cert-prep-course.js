/**
 * HR.com Certification Prep Courses - Minisite Master Navigation Controller
 * Handles active page detection, mobile auto-scroll, and sync with CMS minisite chrome.
 */

(function () {
  'use strict';

  // Master page definitions mapped by index, DOM wrapper selector, and URL slugs
  var PAGE_REGISTRY = [
    {
      index: 0,
      title: 'Our Program',
      selector: '.edu-program-page',
      slugs: ['our-program', 'our_program']
    },
    {
      index: 1,
      title: 'Why Certify',
      selector: '.edu-uc-page',
      slugs: ['why-certify', 'why_certify', 'understanding_certification', 'understanding-hr-certification']
    },
    {
      index: 2,
      title: 'Prep Courses',
      selector: '.edu-prep-page, .edu-course-page',
      slugs: ['prep-courses', 'prep_courses', 'hrci_shrm_prep_courses', '16-week', '8-week', 'aphr', 'shrm-prep']
    },
    {
      index: 3,
      title: 'Pass Guarantee',
      selector: '.edu-pass-page, .pass-assurance-wrapper',
      slugs: ['pass-guarantee', 'pass_guarantee', 'pass-assurance', 'pass-assurance-program']
    },
    {
      index: 4,
      title: 'For Teams',
      selector: '.edu-group-page, .edu-team-page',
      slugs: ['for-teams', 'for_teams', 'cert-group-sales', 'group-certification']
    },
    {
      index: 5,
      title: 'Recertification',
      selector: '.edu-recert-page',
      slugs: ['recertification', 'recert']
    },
    {
      index: 6,
      title: 'Testimonials',
      selector: '.edu-testimonials-page',
      slugs: ['testimonials', 'hr-certification-testimonials']
    },
    {
      index: 7,
      title: 'Convince Employer',
      selector: '.edu-ask-page, .edu-convince-page',
      slugs: ['convince-employer', 'convince_employer', 'ask-my-employer', 'convince/employer']
    },
    {
      index: 8,
      title: 'Resources',
      selector: '.edu-res-wrap, .resource-article, .resource-center',
      slugs: ['resources', 'why-get-hr-certified', 'why-should-you-get-hr-certified', 'certification-resources', 'secrets-to-passing']
    }
  ];

  /**
   * Resolve active menu index based on:
   * 1. Unique DOM page wrapper classes
   * 2. URL pathname & query string matching
   * 3. Legacy .submenu_list active state mirror
   */
  function detectActiveIndex() {
    var i, j, reg, currentPath, currentHref;

    // 1. Check DOM page wrappers
    for (i = 0; i < PAGE_REGISTRY.length; i++) {
      reg = PAGE_REGISTRY[i];
      if (reg.selector && document.querySelector(reg.selector)) {
        return reg.index;
      }
    }

    // 2. Check URL pathname and href
    currentPath = (window.location.pathname || '').toLowerCase();
    currentHref = (window.location.href || '').toLowerCase();

    for (i = 0; i < PAGE_REGISTRY.length; i++) {
      reg = PAGE_REGISTRY[i];
      for (j = 0; j < reg.slugs.length; j++) {
        var slug = reg.slugs[j].toLowerCase();
        if (currentPath.indexOf(slug) !== -1 || currentHref.indexOf(slug) !== -1) {
          return reg.index;
        }
      }
    }

    // 3. Fallback: Mirror legacy .submenu_list if marked active by page scripts
    var legacyActive = document.querySelector('.submenu_list > li > a.active');
    if (legacyActive && legacyActive.parentElement) {
      var allLegacyItems = document.querySelectorAll('.submenu_list > li');
      for (i = 0; i < allLegacyItems.length; i++) {
        if (allLegacyItems[i] === legacyActive.parentElement) {
          return i;
        }
      }
    }

    return -1;
  }

  /**
   * Apply active classes to the minisite navigation
   */
  function applyActiveState() {
    var navLinks = document.querySelectorAll('.domain-minisite-nav-link');
    var navItems = document.querySelectorAll('.domain-minisite-nav-item');
    if (!navLinks || navLinks.length === 0) return false;

    var activeIdx = detectActiveIndex();
    if (activeIdx < 0 || activeIdx >= navLinks.length) return false;

    // Remove existing active states
    for (var i = 0; i < navLinks.length; i++) {
      navLinks[i].classList.remove('active', 'is-active');
      navLinks[i].removeAttribute('aria-current');
      if (navItems[i]) {
        navItems[i].classList.remove('active', 'is-active', 'domain-minisite-nav-item--active');
      }
    }

    // Set targeted item active
    var targetLink = navLinks[activeIdx];
    var targetItem = navItems[activeIdx];

    if (targetLink) {
      targetLink.classList.add('active');
      targetLink.setAttribute('aria-current', 'page');
    }
    if (targetItem) {
      targetItem.classList.add('active', 'domain-minisite-nav-item--active');
    }

    // Auto-scroll mobile nav bar into center
    scrollActiveNavIntoView(targetLink);
    return true;
  }

  /**
   * Scroll active navigation link into center on mobile & touch devices
   */
  function scrollActiveNavIntoView(linkEl) {
    if (!linkEl) return;
    var navContainer = document.querySelector('nav.domain-minisite-nav') || linkEl.closest('.domain-minisite-nav');
    if (!navContainer) return;

    if (navContainer.scrollWidth > navContainer.clientWidth) {
      var containerRect = navContainer.getBoundingClientRect();
      var linkRect = linkEl.getBoundingClientRect();
      var scrollTarget = (linkRect.left - containerRect.left) + navContainer.scrollLeft - (navContainer.clientWidth / 2) + (linkRect.width / 2);

      try {
        navContainer.scrollTo({
          left: Math.max(0, scrollTarget),
          behavior: 'smooth'
        });
      } catch (e) {
        navContainer.scrollLeft = Math.max(0, scrollTarget);
      }
    }
  }

  /**
   * Initialization cycle with retry handling
   */
  function init() {
    var applied = applyActiveState();
    if (!applied) {
      // Retry in case DOM was still injecting
      var attempts = 0;
      var interval = setInterval(function () {
        attempts++;
        if (applyActiveState() || attempts >= 10) {
          clearInterval(interval);
        }
      }, 150);
    }

    // Observer for late modifications or CMS ajax transitions
    if (window.MutationObserver) {
      var headerEl = document.querySelector('header.domain-minisite-header');
      if (headerEl) {
        var observer = new MutationObserver(function () {
          var currentActive = document.querySelector('.domain-minisite-nav-link.active');
          if (!currentActive) {
            applyActiveState();
          }
        });
        observer.observe(headerEl, { childList: true, subtree: true });
      }
    }

    // Also re-center on window resize
    window.addEventListener('resize', function () {
      var currentActive = document.querySelector('.domain-minisite-nav-link.active');
      if (currentActive) {
        scrollActiveNavIntoView(currentActive);
      }
    }, { passive: true });
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
