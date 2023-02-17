var loginApi = "http://localhost:5000/users";
const username = document.querySelector("#login-username");
const password = document.querySelector("#login-password");
const login_btn_action = document.querySelector("#login-btn-action");
const login_form = document.querySelector(".login-form");
const login_user_form = document.querySelector(".login-user");
const login_password_form = document.querySelector(".login-password");
const login_user_title = document.querySelector(".login-user-title");
const login_password_title = document.querySelector(".login-password-title");
const login_user_input = document.querySelector("#login-username");
const login_password_input = document.querySelector("#login-password");

login_btn_action.addEventListener("click", () => {
  let admin = {
    username: username.value,
    passwords: password.value,
  };
  loginUser(admin, "jwt_ad");
});
function setCookie(cname, cvalue, exdays) {
  const d = new Date();
  d.setTime(d.getTime() + exdays * 24 * 60 * 60 * 1000);
  let expires = "expires=" + d.toUTCString();
  document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
}
function loginUser(user, accessToken) {
  let option = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(user),
  };
  fetch(loginApi + "/loginAdmin", option)
    .then((response) => response.json())
    .then((response) => {
      if (response.message === "login success") {
        setCookie(accessToken, response.accessToken, 1);
        alert("Login success!");
        location.reload();
      } else {
        alert("Login fail!");
      }
    });
}

// Animation
function handleAnimationUser() {
  login_user_input.addEventListener("focus", () => {
    login_user_title.style =
      "top: 155px; left: 580px; color: #008848;transition: all 0.5s;";
    login_user_form.style = " border: 1px solid #008848;";
  });
}
function handleAnimationPassword() {
  login_password_input.addEventListener("focus", () => {
    login_password_title.style =
      "top: 245px; left: 580px; color: #008848;transition: all 0.5s;";
    login_password_form.style = " border: 1px solid #008848;";
  });
}

function handleAnimationLoginForm() {
  window.onclick = function (e) {
    if (e.target !== login_user_input) {
      if (login_user_input.value === "")
        handleAnimation(
          login_user_title,
          185,
          600,
          333333,
          login_user_form,
          999999
        );
    }
    if (e.target !== login_password_input) {
      if (login_password_input.value === "")
        handleAnimation(
          login_password_title,
          280,
          600,
          333333,
          login_password_form,
          999999
        );
    }
  };
}
function handleAnimation(element, top, left, color, elements, background) {
  element.style = `top: ${top}px; left: ${left}px; color: #${color};transition: all 0.5s;`;
  elements.style = `border: 1px solid #${background};`;
}

handleAnimationLoginForm();
handleAnimationPassword();
handleAnimationUser();
