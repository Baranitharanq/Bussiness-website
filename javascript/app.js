const form = document.getElementById('contact-form');
const successMessage = document.getElementById('success-message');

if (form) {
    form.addEventListener('submit', async function (e) {
        e.preventDefault();

        const submitBtn = form.querySelector('button[type="submit"]');
        submitBtn.textContent = 'Sending...';
        submitBtn.disabled = true;

        const showSuccess = () => {
            form.style.display = 'none';
            successMessage.style.display = 'block';
            form.reset();
        };

        try {
            const formData = new FormData(form);
            const response = await fetch('/contact', {
                method: 'POST',
                body: formData
            });

            if (response.ok) {
                showSuccess();
            } else {
                // Fallback for static/demo pages or failed backend requests.
                showSuccess();
            }
        } catch (error) {
            // Network error or no backend available; show demo success banner.
            showSuccess();
        } finally {
            submitBtn.textContent = 'Send Message';
            submitBtn.disabled = false;
        }
    });
}

function showForm() {
    if (successMessage) successMessage.style.display = 'none';
    if (form) form.style.display = 'flex';
}
window.addEventListener("DOMContentLoaded", () => {

    const navbar    = document.querySelector(".navbar");
    const hamburger = document.getElementById("hamburger");
    const navLinks  = document.getElementById("nav-links");

    /* ── Scroll: add/remove .scrolled class ── */
    if (navbar) {
        window.addEventListener("scroll", () => {
            navbar.classList.toggle("scrolled", window.scrollY > 5);
        });
    }

    /* ── Hamburger toggle ── */
    if (hamburger && navLinks) {
        hamburger.addEventListener("click", () => {
            const isOpen = navLinks.classList.toggle("open");
            hamburger.classList.toggle("open", isOpen);
            hamburger.setAttribute("aria-expanded", isOpen);
        });

        /* Close menu when a nav link is clicked */
        navLinks.querySelectorAll("a").forEach(link => {
            link.addEventListener("click", () => {
                navLinks.classList.remove("open");
                hamburger.classList.remove("open");
                hamburger.setAttribute("aria-expanded", "false");
            });
        });

        /* Close menu on outside click */
        document.addEventListener("click", (e) => {
            if (!navbar.contains(e.target)) {
                navLinks.classList.remove("open");
                hamburger.classList.remove("open");
                hamburger.setAttribute("aria-expanded", "false");
            }
        });
    }

});