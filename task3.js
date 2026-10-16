const form = document.getElementById("contactForm");
const result = document.getElementById("result");
const fields = form.querySelectorAll("input, textarea");

function validateField(field) {
  const ok = field.checkValidity();          
  field.classList.toggle("is-valid", ok);
  field.classList.toggle("is-invalid", !ok);
  return ok;
}

fields.forEach((field) => {
  field.addEventListener("blur", () => validateField(field));
  field.addEventListener("input", () => {
    if (field.classList.contains("is-valid") || field.classList.contains("is-invalid")) {
      validateField(field);
    }
  });
});

form.addEventListener("submit", (event) => {
  event.preventDefault();
  let allValid = true;
  fields.forEach((field) => { if (!validateField(field)) allValid = false; });

  result.innerHTML = allValid
    ? '<div class="alert alert-success mb-0">Message sent successfully!</div>'
    : '<div class="alert alert-danger mb-0">Please fix the errors above.</div>';
});
