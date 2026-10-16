const form = document.getElementById("regForm");
const result = document.getElementById("result");
const password = document.getElementById("password");
const confirmPassword = document.getElementById("confirmPassword");
const confirmFeedback = document.getElementById("confirmFeedback");
const genderFeedback = document.getElementById("genderFeedback");
const radios = form.querySelectorAll('input[name="gender"]');
const textFields = form.querySelectorAll(
  "#firstName, #lastName, #email, #password, #confirmPassword, #country"
);

function checkPasswordMatch() {
  if (confirmPassword.value === "") {
    confirmPassword.setCustomValidity("Please confirm your password.");
    confirmFeedback.textContent = "Please confirm your password.";
  } else if (confirmPassword.value !== password.value) {
    confirmPassword.setCustomValidity("Passwords do not match.");
    confirmFeedback.textContent = "Passwords do not match.";
  } else {
    confirmPassword.setCustomValidity("");
  }
}

function validateField(field) {
  if (field === password || field === confirmPassword) checkPasswordMatch();
  const ok = field.checkValidity();
  field.classList.toggle("is-valid", ok);
  field.classList.toggle("is-invalid", !ok);
  return ok;
}

function validateGender() {
  const ok = [...radios].some((r) => r.checked);
  radios.forEach((r) => r.classList.toggle("is-invalid", !ok));
  genderFeedback.style.display = ok ? "none" : "block";
  return ok;
}

textFields.forEach((field) => {
  field.addEventListener("blur", () => validateField(field));
  field.addEventListener("input", () => {
    if (field.classList.contains("is-valid") || field.classList.contains("is-invalid")) {
      validateField(field);
    }
    if (field === password && confirmPassword.value !== "") validateField(confirmPassword);
  });
});
document.getElementById("country").addEventListener("change", (e) => validateField(e.target));
radios.forEach((r) => r.addEventListener("change", validateGender));

form.addEventListener("submit", (event) => {
  event.preventDefault();
  let allValid = true;
  textFields.forEach((f) => { if (!validateField(f)) allValid = false; });
  if (!validateGender()) allValid = false;

  if (allValid) {
    const hobbies = [...form.querySelectorAll('input[name="hobbies"]:checked')].map((h) => h.value);
    result.innerHTML =
      '<div class="alert alert-success mb-0">Registration successful! Welcome, ' +
      document.getElementById("firstName").value.trim() +
      (hobbies.length ? ". Hobbies: " + hobbies.join(", ") : "") +
      ".</div>";
  } else {
    result.innerHTML = '<div class="alert alert-danger mb-0">Please fix the errors above.</div>';
  }
});

form.addEventListener("reset", () => {
  form.querySelectorAll(".is-valid, .is-invalid").forEach((el) =>
    el.classList.remove("is-valid", "is-invalid")
  );
  genderFeedback.style.display = "none";
  confirmPassword.setCustomValidity("");
  result.innerHTML = "";
});
