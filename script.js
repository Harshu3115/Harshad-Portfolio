// ===============================
// SCROLL REVEAL ANIMATIONS
// ===============================

const sr = ScrollReveal({
  distance: '60px',
  duration: 2000,
  delay: 200,
  reset: false
});

sr.reveal('.navbar', {
  origin: 'top'
});

sr.reveal('.hero-left', {
  origin: 'left'
});

sr.reveal('.hero-right', {
  origin: 'right'
});

sr.reveal('.about-img', {
  origin: 'left'
});

sr.reveal('.about-content', {
  origin: 'right'
});

sr.reveal('.contact-section', {
  origin: 'bottom'
});

sr.reveal('.card', {
  origin: 'bottom',
  interval: 200
});


// ===============================
// PROJECT CARD ANIMATION
// ===============================

document.querySelectorAll('.card').forEach((card, index) => {

  card.style.opacity = "0";
  card.style.transform = "translateY(40px)";

  setTimeout(() => {

    card.style.transition = "all 0.8s ease";

    card.style.opacity = "1";

    card.style.transform = "translateY(0)";

  }, index * 150);

});


const form = document.getElementById('form');
const submitBtn = form.querySelector('button[type="submit"]');

form.addEventListener('submit', async (e) => {
  e.preventDefault();

  const formData = new FormData(form);
  formData.append("access_key", "f794a23d-dd57-4006-b4c8-edb81288060c");

  const originalText = submitBtn.textContent;

  submitBtn.textContent = "Sending...";
  submitBtn.disabled = true;

  try {
    const response = await fetch("https://api.web3forms.com/submit", {
      method: "POST",
      body: formData
    });

    const data = await response.json();

    if (response.ok) {
      alert("Success! Your message has been sent.");
      form.reset();
    } else {
      alert("Error: " + data.message);
    }

  } catch (error) {
    alert("Something went wrong. Please try again.");
  } finally {
    submitBtn.textContent = originalText;
    submitBtn.disabled = false;
  }
});
