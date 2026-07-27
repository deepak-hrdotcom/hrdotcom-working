document.addEventListener('DOMContentLoaded', () => {
  const track = document.getElementById('testimonial-track');
  if(!track) return;
  const slides = Array.from(track.children);
  const wrapper = document.querySelector('.testimonial-slider-wrapper');
  const dotsContainer = document.getElementById('testimonial-dots');
  
  let currentIndex = 0;
  let autoPlayInterval;
  const intervalTime = 8000; // 8 seconds per slide

  slides.forEach((_, index) => {
    const dot = document.createElement('div');
    dot.classList.add('testimonial-dot');
    if (index === 0) dot.classList.add('active');
    dot.addEventListener('click', () => {
      goToSlide(index);
      resetInterval();
    });
    dotsContainer.appendChild(dot);
  });

  const dots = Array.from(dotsContainer.children);

  const updateSlider = () => {
    track.style.transform = `translateX(-${currentIndex * 100}%)`;
    dots.forEach(dot => dot.classList.remove('active'));
    if(dots[currentIndex]) {
        dots[currentIndex].classList.add('active');
    }
  };

  const nextSlide = () => {
    currentIndex = (currentIndex + 1) % slides.length;
    updateSlider();
  };

  const goToSlide = (index) => {
    currentIndex = index;
    updateSlider();
  };

  const startInterval = () => {
    autoPlayInterval = setInterval(nextSlide, intervalTime);
  };

  const resetInterval = () => {
    clearInterval(autoPlayInterval);
    startInterval();
  };

  wrapper.addEventListener('mouseenter', () => clearInterval(autoPlayInterval));
  wrapper.addEventListener('mouseleave', startInterval);

  startInterval();
});
