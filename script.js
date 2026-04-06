async function login() {
  const username = document.getElementById("username").value;
  const password = document.getElementById("password").value;

  const res = await fetch("/.netlify/functions/login", {
    method: "POST",
    body: JSON.stringify({ username, password }),
  });

  const data = await res.json();

  if (res.status === 200) {
    window.location.href = "index.html";
  } else {
    document.getElementById("message").innerText = data.message;
  }
}


// PAGE NAVIGATION
const navItems = document.querySelectorAll('.nav-item');
const pages = document.querySelectorAll('.page');
const burger = document.getElementById("burger");
const nav = document.getElementById("nav");

burger.addEventListener("click", () => {
 nav.classList.toggle("show");
});

navItems.forEach(item => {
    item.addEventListener('click', (e) => {
        e.preventDefault();

        // Remove active class from all nav items and pages
        navItems.forEach(nav => nav.classList.remove('active'));
        pages.forEach(page => page.classList.remove('active'));

        // Add active class to clicked nav item
        item.classList.add('active');

        // Get the page to show
        const pageId = item.getAttribute('data-page') + '-page';
        const pageElement = document.getElementById(pageId);
        
        if (pageElement) {
            pageElement.classList.add('active');
        }
    });
});

document.querySelectorAll('.nav-item').forEach(item => {
  item.addEventListener('click', () => {
    nav.classList.remove('show');
  });
});

// Set home page as active on load
document.addEventListener('DOMContentLoaded', () => {
    const homePage = document.getElementById('home-page');
    if (homePage) {
        homePage.classList.add('active');
    }
});

// CONTACT FORM HANDLING
const contactForm = document.getElementById('contactForm');
if (contactForm) {
    const successMessage = document.getElementById('successMessage');
    const submitBtn = contactForm.querySelector('.submit-btn');
    const originalBtnText = submitBtn.textContent;

    contactForm.addEventListener('submit', async (e) => {
        e.preventDefault();

        const name = document.getElementById('name').value.trim();
        const email = document.getElementById('email').value.trim();
        const subject = document.getElementById('subject').value.trim();
        const message = document.getElementById('message').value.trim();

        // Validation
        if (!name || !email || !subject || !message) {
            alert('Please fill in all fields');
            return;
        }

        if (!email.includes('@')) {
            alert('Please enter a valid email');
            return;
        }

        // Show loading state
        submitBtn.disabled = true;
        submitBtn.textContent = 'Sending...';

        try {
            // Send to Formspree (update with your form ID)
            const response = await fetch('https://formspree.io/f/YOUR_FORM_ID', {
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    name: name,
                    email: email,
                    subject: subject,
                    message: message
                })
            });

            if (response.ok) {
                // Show success message
                successMessage.classList.add('show');

                // Reset form
                contactForm.reset();

                // Reset button
                submitBtn.disabled = false;
                submitBtn.textContent = originalBtnText;

                // Hide success message after 5 seconds
                setTimeout(() => {
                    successMessage.classList.remove('show');
                }, 5000);
            } else {
                throw new Error('Form submission failed');
            }
        } catch (error) {
            console.error('Error:', error);
            alert('Error sending message. Please try again.');
            submitBtn.disabled = false;
            submitBtn.textContent = originalBtnText;
        }
    });
}

// Smooth scroll handling
document.addEventListener('click', (e) => {
    const link = e.target.closest('a[href^="#"]');
    if (link && link !== e.target) {
        e.preventDefault();
        const navItem = link.closest('.nav-item');
        if (navItem) {
            navItem.click();
        }
    }
});

// Initialize on page load IMG CERT full screen load
document.addEventListener('DOMContentLoaded', function() {
    setActiveNav();
    animateProgressBars();
    handleContactForm();
});

function openImage(img){
    const modal = document.getElementById("imgModal");
    const modalImg = document.getElementById("modalImg");

    modal.style.display = "block";
    modalImg.src = img.src;
}

function closeImage(){
    document.getElementById("imgModal").style.display = "none";
}

/* CLOSE WITH ESC KEY */

document.addEventListener("keydown", function(event){
    if(event.key === "Escape"){
        closeImage();
    }
});

console.log('Portfolio sidebar loaded successfully!');
