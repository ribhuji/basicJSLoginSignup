window.addEventListener('load', () => {
    let name = document.querySelector('.name-value');
    let email = document.querySelector('.email-value');
    let phone = document.querySelector('.phone-value');
    let address = document.querySelector('.address-value');
    let loginMessage = document.querySelector('.login-message');

    if (isLoggedIn()) {
        var bearer_token = localStorage.getItem("token");
        var bearer = 'Bearer ' + bearer_token;
        fetch('http://localhost:5001/api/auth/account', {
            method: 'GET',
            credentials: 'include',
            headers: {
                'Authorization': bearer
            }
        })
            .then(response => {
                console.log(response.status);
                return response.json();
            })
            .then(data => {
                console.log(data);
                name.textContent = data.data.name + " " + data.data.surname;
                email.textContent = data.data.email;
                phone.textContent = data.data.contactNumber;
                address.textContent = data.data.address;
            })
            .catch(err => {
                console.log("error is ", err);
            });
    } else {
        loginMessage.textContent = "You are not logged in, log in first";
        loginMessage.style.color = "red";
    }
});

async function isLoggedIn() {
    const token = localStorage.getItem("token");
    if (!token) {
        return false
    } else {
        return true;
    }
}