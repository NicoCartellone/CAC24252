document.addEventListener("DOMContentLoaded", function () {
    // login form and fetch login backedn endpoint
    const loginForm = document.getElementById("login-form");
    loginForm.addEventListener("submit", async function (event) {
        event.preventDefault();
        const email = document.getElementById("email").value;
        const password = document.getElementById("password").value;
        const response = await fetch("http://localhost:8080/login", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                email: email,
                contraseña: password
            }),
        });
        const data = await response.json();
        if (response.ok) {
            // save user in localStorage
            localStorage.setItem("user", JSON.stringify(data));
            if(data.usuario.id_rol == 1){
                window.location = "/frontend/admin.html";
            }else{
                window.location = "/frontend/index.html";
            }
        } else {
            alert("Error, credenciales");
        }
    });
})

