---
name: updating-certification-trackers
description: Manages and updates enrollment schedules, CTA buttons, and Early Bird banners in HR.com certification prep tracker HTML files. Triggered when the user asks to update 16-week.html, 8-week.html, shrm-prep.html, or aphr-prep.html with new group data from spreadsheets.
---

# Updating Certification Trackers

This skill is designed to automate and standardize the process of updating enrollment groups in the HR.com certification prep tracker pages.

## When to use this skill
- Use when the user provides a spreadsheet or list of new certification groups (Group 11, 12, etc.).
- Use when updating product IDs or deal descriptions for course purchase buttons.
- Use when managing Early Bird deadline banners (`.earlybird-offer`).
- Trigger keywords: "update certification tracker", "enrollment group update", "certification enrollment", "prep tracker update", "16-week.html", "8-week.html", "shrm-prep.html", "aphr-prep.html".

## Workflow

1.  **Extract Data**:
    *   Identify Group Number, Dates, Scheduling, and Early Bird Deadlines.
    *   Map the Product IDs and Deal Descriptions for both "Purchase Course" and "Purchase Course + HR Prime Bundle".
2.  **Locate Target File**:
    *   `16-week.html`: 16-week PHR/SPHR/SHRM prep.
    *   `8-week.html`: 8-week PHR/SPHR/SHRM prep.
    *   `shrm-prep.html`: SHRM-specific prep (often includes both 8 and 16 week groups).
    *   `aphr-prep.html`: aPHR-specific prep.
3.  **Find Insertion Point**:
    *   Look for the `.en_list_wrapper` div within the `.enrolltab` section.
    *   Insert new groups before the `.lead-btn-container`.
4.  **Implement Early Bird Logic**:
    *   Ensures the `.earlybird-offer` banner appears **only once per month**.
    *   Place it before the first group that falls under that deadline.
5.  **Set Instructor**:
    *   Default to "To Be Announced" (`.en_it.tba`).
    *   If a name is provided, check `utils.html` for the instructor's photo and credentials.It it is not available notify user.
6.  **Verify CTA Links**:
    *   Ensure `productID` and `dealdesc` are correctly inserted into the URL.

## Implementation Details

### Enrollment Card Template
```html
<div class="en_list_card">
  <div class="en_gp">Group [Number]</div>
  <div class="en_ds">
    <h4>[Full Date Range]</h4>
    <h5>[Day of Week]</h5>
    <h6>[Time Range] ET</h6>
  </div>
  <div class="en_it tba"><span>To Be Announced</span></div>
  <div class="en_pc">
    <div>
      <a class="hr_custom_btn gradient_btn btn_small round scoPage quick-login-m1" 
         href="https://www.hr.com/en?t=/merchant/singleCheckoutWizerd/product.show&productID=[ID1]&ParentID=0&sort=0&pt=100&dealcat=2&dealdesc=[DESC1]">
         Purchase Course
      </a>
      <a class="ms_link" href="https://public-cdn.hr.com/system/app/media/rs/2020/3/17/k7vz4heu/og.jpg" onclick="window.open(this.href,'','resizable=no,status=no,location=no,toolbar=no,menubar=no,fullscreen=no,scrollbars=no,dependent=no'); return false">
         Map shipment
      </a>
    </div>
    <a class="hr_custom_btn gradient_btn btn_small round scoPage quick-login-m1" 
       href="https://www.hr.com/en?t=/merchant/singleCheckoutWizerd/product.show&productID=[ID2]&ParentID=0&sort=0&pt=100&dealcat=2&dealdesc=[DESC2]">
       Purchase Course + HR Prime Bundle
    </a>
  </div>
</div>
```

### Early Bird Banner Template
```html
<div class="earlybird-offer">
  <span> Offer ends soon! Enroll by <span>[Date]</span>&nbsp;and save <span>$50</span> with promo code <span>EARLYBIRD50</span> at checkout. </span>
</div>
```

## Resources
- [utils.html](file:///e:/HR/00-html/01-education/cert-prep-tracker/utils.html): Contains master templates and instructor details.
