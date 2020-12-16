const loginForm = document.getElementById("login-form");
const loginButton = document.getElementById("login-form-submit");
let loginMessage = document.querySelector('.login-message');

loginButton.addEventListener("click", (e) => {
    e.preventDefault();
    const email = loginForm.email.value;
    const password = loginForm.password.value;
    const confpassword = loginForm.confpassword.value;
    const address = loginForm.address.value;
    const phone = loginForm.phone.value;
    const name = loginForm.name.value;
    const surname = loginForm.lastname.value;

    console.log(email, password, confpassword, address, phone, name, surname);
    //var myJson = login(username, password);
    if(confpassword !== password){
        loginMessage.textContent = "Confirm password doesnt match";
        loginMessage.style.color = "red";
    }
    
  fetch('http://localhost:5001/api/auth/register', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ "email": email, "password": password, "name": name, "surname": surname, "contactNumber": phone, "address": address, "role": "abc" }), // string or object
  })
    .then(response => {
      console.log(response.status);
      if(response.status !== 201){
        loginMessage.textContent = "Signup Unsuccessfull";
        loginMessage.style.color = "red";
      } else{
        loginMessage.textContent = "Signup Successfull";
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
