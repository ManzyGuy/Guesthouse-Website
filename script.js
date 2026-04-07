document.addEventListener('DOMContentLoaded', () => {
    // Set Current Year in Footer
    const yearSpan = document.getElementById('year');
    if (yearSpan) {
        yearSpan.textContent = new Date().getFullYear();
    }

    // --- Image Carousel Logic with Touch Support ---
    const carouselContainer = document.getElementById('roomCarousel');
    const carouselImages = document.querySelectorAll('.carousel-image');
    const indicators = document.querySelectorAll('.indicator');
    const prevBtn = document.getElementById('carouselPrev');
    const nextBtn = document.getElementById('carouselNext');
    let currentSlide = 0;
    
    // Swipe detection variables
    let touchStartX = 0;
    let touchEndX = 0;
    const minSwipeDistance = 50;

    if (carouselImages.length > 0) {
        function updateSlide(index) {
            // Remove active classes
            carouselImages.forEach(img => img.classList.remove('active'));
            indicators.forEach(ind => ind.classList.remove('active'));

            // Handle wrapping
            if (index >= carouselImages.length) {
                currentSlide = 0;
            } else if (index < 0) {
                currentSlide = carouselImages.length - 1;
            } else {
                currentSlide = index;
            }

            // Set new active classes
            carouselImages[currentSlide].classList.add('active');
            indicators[currentSlide].classList.add('active');
        }

        nextBtn.addEventListener('click', () => updateSlide(currentSlide + 1));
        prevBtn.addEventListener('click', () => updateSlide(currentSlide - 1));

        indicators.forEach((indicator, idx) => {
            indicator.addEventListener('click', () => updateSlide(idx));
        });

        // Touch swipe handlers
        carouselContainer.addEventListener('touchstart', (e) => {
            touchStartX = e.changedTouches[0].screenX;
        }, { passive: true });

        carouselContainer.addEventListener('touchend', (e) => {
            touchEndX = e.changedTouches[0].screenX;
            handleSwipe();
        }, { passive: true });

        function handleSwipe() {
            const swipeDistance = touchEndX - touchStartX;
            if (Math.abs(swipeDistance) > minSwipeDistance) {
                if (swipeDistance > 0) {
                    // Swiped Right -> Previous Slide
                    updateSlide(currentSlide - 1);
                } else {
                    // Swiped Left -> Next Slide
                    updateSlide(currentSlide + 1);
                }
            }
        }

        // Optional auto-slide every 5 seconds
        setInterval(() => {
            updateSlide(currentSlide + 1);
        }, 5000);
    }

    // --- Fade-In Scroll Animations ---
    const fadeElements = document.querySelectorAll('.fade-in');

    const appearOptions = {
        threshold: 0.1,
        rootMargin: "0px 0px -50px 0px"
    };

    const appearOnScroll = new IntersectionObserver(function(entries, observer) {
        entries.forEach(entry => {
            if (!entry.isIntersecting) {
                return;
            } else {
                entry.target.classList.add('visible');
                // Stop observing once visible to run animation only once
                observer.unobserve(entry.target);
            }
        });
    }, appearOptions);

    fadeElements.forEach(el => {
        appearOnScroll.observe(el);
    });
});
