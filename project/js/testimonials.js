// Testimonials Data
const testimonials = [
    {
        name: "John Doe",
        message: "I'm grateful to be part of this amazing community. Donating blood regularly makes me feel like I'm making a real difference.",
        date: "2024-01-15",
        bloodGroup: "O+"
    },
    {
        name: "Sarah Smith",
        message: "When my mother needed blood urgently, this platform helped us find donors quickly. Thank you for this life-saving service!",
        date: "2024-02-01",
        bloodGroup: "A-"
    },
    {
        name: "Mike Johnson",
        message: "The process was smooth and well-organized. The staff was professional and made me feel comfortable throughout the donation.",
        date: "2024-02-10",
        bloodGroup: "B+"
    }
];

// Load Testimonials
document.addEventListener('DOMContentLoaded', () => {
    const testimonialContainer = document.getElementById('testimonialContainer');
    
    if (testimonialContainer) {
        loadTestimonials();
    }
});

function loadTestimonials() {
    const testimonialContainer = document.getElementById('testimonialContainer');
    
    testimonials.forEach(testimonial => {
        const testimonialCard = createTestimonialCard(testimonial);
        testimonialContainer.appendChild(testimonialCard);
    });
}

function createTestimonialCard(testimonial) {
    const card = document.createElement('div');
    card.className = 'testimonial-card';
    card.style.backgroundColor = 'white';
    card.style.padding = '2rem';
    card.style.borderRadius = '10px';
    card.style.boxShadow = '0 3px 10px rgba(0,0,0,0.1)';

    const content = `
        <div class="testimonial-header">
            <h3 style="color: var(--primary-color);">${testimonial.name}</h3>
            <span style="color: var(--dark-color);">Blood Group: ${testimonial.bloodGroup}</span>
        </div>
        <p style="margin: 1rem 0;">${testimonial.message}</p>
        <div class="testimonial-footer" style="color: #666; font-size: 0.9rem;">
            ${new Date(testimonial.date).toLocaleDateString()}
        </div>
    `;

    card.innerHTML = content;
    return card;
}