const loginForm = document.getElementById("login-form");
const loginButton = document.getElementById("login-form-submit");
let loginMessage = document.querySelector('.login-message');

loginButton.addEventListener("click", (e) => {
    e.preventDefault();
    const username = loginForm.email.value;
    const password = loginForm.password.value;

    console.log(username, password);
    //var myJson = login(username, password);
    
  fetch('http://localhost:5001/api/auth/login', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ "username": username, "password": password }), // string or object
  })
    .then(response => {
      console.log(response.status);
      if(response.status !== 200){
        loginMessage.textContent = "Login Unsuccessfull";
        loginMessage.style.color = "red";
      } else{
        loginMessage.textContent = "Login Successfull";
        loginMessage.style.color = "green";
      }
      return response.json();
    })
    .then(data => {
      console.log(data.token);
      localStorage.setItem('token', data.token);
    })
    .catch(err => {
      console.log("error is " , err);
    });
});

async function isLoggedIn() {
  const token = localStorage.getItem("token");
  if (!token) {
      return false
  } else {
    console.log(token);
      return true;
  }
}