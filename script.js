document.addEventListener('DOMContentLoaded', () => {
    // Set Current Year in Footer
    const yearSpan = document.getElementById('year');
    if (yearSpan) {
        yearSpan.textContent = new Date().getFullYear();
    }

    // Handle Review Form Submission
    const reviewForm = document.getElementById('reviewForm');
    const reviewsContainer = document.getElementById('reviewsContainer');

    if (reviewForm && reviewsContainer) {
        reviewForm.addEventListener('submit', (e) => {
            e.preventDefault();

            // Get Form Data
            const guestName = document.getElementById('guestName').value.trim();
            const stayDuration = document.getElementById('stayDuration').value.trim();
            const comfortLevel = parseInt(document.getElementById('comfortLevel').value, 10) || 5;
            const stayDescription = document.getElementById('stayDescription').value.trim();

            if (!guestName || !stayDescription) return;

            // Generate Stars
            const stars = Array(comfortLevel).fill('★').join('') + Array(5 - comfortLevel).fill('☆').join('');

            // Create New Review Element
            const newReview = document.createElement('div');
            newReview.className = 'review-card surface-highest';
            
            // Add a simple fade-in effect via CSS transition
            newReview.style.opacity = '0';
            newReview.style.transform = 'translateY(10px)';
            newReview.style.transition = 'all 0.5s ease';

            newReview.innerHTML = `
                <div class="review-header">
                    <span class="title-sm">${escapeHTML(guestName)}</span>
                    <span class="label-md review-rating">${stars}</span>
                </div>
                <p class="body-sm review-meta">Stayed for ${escapeHTML(stayDuration)}</p>
                <p class="body-md review-text">
                    "${escapeHTML(stayDescription)}"
                </p>
            `;

            // Prepend new review
            reviewsContainer.insertBefore(newReview, reviewsContainer.firstChild);

            // Trigger reflow for animation
            setTimeout(() => {
                newReview.style.opacity = '1';
                newReview.style.transform = 'translateY(0)';
            }, 10);

            // Reset Form and show a brief confirmation state
            reviewForm.reset();
            
            const submitBtn = reviewForm.querySelector('.btn-primary');
            const originalText = submitBtn.textContent;
            submitBtn.textContent = 'Reflection Added';
            submitBtn.style.backgroundColor = 'var(--primary-dim)';
            
            setTimeout(() => {
                submitBtn.textContent = originalText;
                submitBtn.style.backgroundColor = '';
            }, 3000);
        });
    }

    // Image Carousel Logic
    const carouselImages = document.querySelectorAll('.carousel-image');
    const indicators = document.querySelectorAll('.indicator');
    const prevBtn = document.getElementById('carouselPrev');
    const nextBtn = document.getElementById('carouselNext');
    let currentSlide = 0;

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

        // Optional auto-slide every 5 seconds
        setInterval(() => {
            updateSlide(currentSlide + 1);
        }, 5000);
    }

    // Utility for basic XSS prevention in display
    function escapeHTML(str) {
        const div = document.createElement('div');
        div.textContent = str;
        return div.innerHTML;
    }
});
