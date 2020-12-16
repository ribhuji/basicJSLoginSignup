const loginButton = document.getElementById("login-form-submit");
let loginMessage = document.querySelector('.login-message');
if(isLoggedIn()){
  loginMessage.textContent = "you are logged in";
  loginMessage.style.color = "green";
}
loginButton.addEventListener("click", (e) => {
    localStorage.removeItem('token')
});

async function isLoggedIn() {
  const token = localStorage.getItem("token");
  if (!token) {
      return false
  } else {
      return true;
  }
}