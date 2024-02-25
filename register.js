<script type="module">
document.addEventListener("DOMContentLoaded", function () {
    // Import the functions you need from the SDKs you need
    import { initializeApp } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-app.js";
    import { getAuth, createUserWithEmailAndPassword, sendEmailVerification, onAuthStateChanged } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-auth.js";
    import { getDatabase, set, ref, get } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-database.js";

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

    document.getElementById("btnr").addEventListener("click", registerUser);

    function registerUser() {
        let f_name = document.getElementById("f_name").value;
        let m_name = document.getElementById("m_name").value;
        let l_name = document.getElementById("l_name").value;
        let phone_num = document.getElementById("phone_num").value;
        let email = document.getElementById("email").value;
        let password = document.getElementById("password").value;

        createUserWithEmailAndPassword(auth, email, password)
            .then((credentials) => {
                set(ref(db, 'UsersAuthList/' + credentials.user.uid), {
                    a_firstName: f_name,
                    b_middleName: m_name,
                    c_lastName: l_name,
                    d_phoneNum: phone_num,
                    e_email: email,
                    f_password: password,
                    g_verification: false
                });

                alert("Registration Complete");

                // Sending Verification thru email
                sendEmailVerification(credentials.user)
                    .then(() => {
                        alert('Verification email sent to ' + email);
                    })
                    .catch((error) => {
                        console.error('Error sending verification email:', error.message);
                    });
            })
            .catch((error) => {
                alert(error.message);
                console.error(error.code, error.message);
            });
    }

    onAuthStateChanged(auth, (user) => {
        if (user) {
            get(ref(db, 'UsersAuthList/' + user.uid))
                .then((snapshot) => {
                    const userData = snapshot.val();
                    if (userData && !userData.g_verification) {
                        alert('Your email is not verified. Please check your email and verify your account.');
                    }
                })
                .catch((error) => {
                    console.error('Error checking verification status:', error.message);
                });
        }
    });
});
</script>
