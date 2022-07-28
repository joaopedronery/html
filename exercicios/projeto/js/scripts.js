const preRegister = document.querySelector("#pre-register-submit");
const postRegister = document.querySelector("#post-register-submit");
const registerForm = document.querySelector("#register-form");

registerForm.addEventListener("submit", (e) => {
    e.preventDefault();
    preRegister.classList.add("hide");
    postRegister.classList.remove("hide");
})