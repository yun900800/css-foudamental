document.addEventListener('DOMContentLoaded', () => {
    const formSections = document.querySelectorAll('.form-section');
    const stepIndicators = document.querySelectorAll('.sticky-step-indicator li');

    const observerOptions = {
        root: null, // observe intersections with the viewport
        rootMargin: '0px 0px -50% 0px', // When the top of the section crosses the middle of the viewport
        threshold: 0 // As soon as any part of the target enters the root, trigger
    };

    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const currentStep = entry.target.dataset.step;

                // Remove active class from all indicators
                stepIndicators.forEach(indicator => {
                    indicator.classList.remove('active');
                });

                // Add active class to the corresponding indicator
                const activeIndicator = document.querySelector(`.sticky-step-indicator li[data-step="${currentStep}"]`);
                if (activeIndicator) {
                    activeIndicator.classList.add('active');
                }
            }
        });
    }, observerOptions);

    formSections.forEach(section => {
        observer.observe(section);
    });

    // Optional: Smooth scrolling for step links
    stepIndicators.forEach(indicator => {
        indicator.querySelector('a').addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            if (targetSection) {
                targetSection.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start' // scroll to the top of the section
                });
            }
        });
    });
});