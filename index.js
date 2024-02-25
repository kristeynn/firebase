<script type="module">
// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-app.js";
import { getAuth, loginEmailPass, onAuthStateChanged } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-auth.js";
import { getDatabase, ref, get } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-database.js";

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyC_Q-FCs-4NNgKtvwU52zCceECx33FJdss",
    authDomain: "ipt-simple-login.firebaseapp.com",
    databaseURL: "https://ipt-simple-login-default-rtdb.firebaseio.com",
    projectId: "ipt-simple-login",
    storageBucket: "ipt-simple-login.appspot.com",
    messagingSenderId: "630916040674",
    appId: "1:630916040674:web:d326630acd5e81a3f6dbbb"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getDatabase();

document.getElementById("loginButton").addEventListener("click", loginUser);

function loginUser() {
    let email = document.getElementById("email").value;
    let password = document.getElementById("password").value;

    loginEmailPass(auth, email, password)
        .then((userCredential) => {
            const user = userCredential.user;
            // Check if the email is verified
            if (user.emailVerified) {
                alert("User Successfully Logged In");
                // Redirect to home.html after a successful login
                window.location.href = "home.html";
            } else {
                alert("Your email is not verified. Please check your email and verify your account.");
            }
        })
        .catch((error) => {
            alert(error.message);
            console.log(error.code);
            console.log(error.message);
        });
}

</script>

