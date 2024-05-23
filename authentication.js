// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.1/firebase-app.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/10.12.1/firebase-analytics.js";
import { getAuth, GoogleAuthProvider, signInWithPopup, signOut, onAuthStateChanged } from "https://www.gstatic.com/firebasejs/10.12.1/firebase-auth.js";

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyComWN1zcY71wfQZsF2QJCEXq4rsIM8u7E",
    authDomain: "tpf-lab-c8ae7.firebaseapp.com",
    projectId: "tpf-lab-c8ae7",
    storageBucket: "tpf-lab-c8ae7.appspot.com",
    messagingSenderId: "934108587330",
    appId: "1:934108587330:web:0bad6f8ac08a116f9894db",
    measurementId: "G-JBR0HGFENE"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

const auth = getAuth(app);
const provider = new GoogleAuthProvider();

const userSignIn = async () => {
    try {
        const result = await signInWithPopup(auth, provider);
        const user = result.user;
        console.log(user);
        
        document.getElementById('firstName').value = user.displayName.split(' ')[0];
        document.getElementById('lastName').value = user.displayName.split(' ')[1] || '';
        document.getElementById('email').value = user.email;

        document.getElementById('authStatus').innerText = '';
    } catch (error) {
        console.error("Error signing in: ", error.code, error.message);
        document.getElementById('authStatus').innerText = `Error: ${error.message}`;
    }
}

const userSignOut = async () => {
    try {
        await signOut(auth);
        alert("You have been signed out!");

        document.getElementById('firstName').value = '';
        document.getElementById('lastName').value = '';
        document.getElementById('email').value = '';
    } catch (error) {
        console.error("Error signing out: ", error.code, error.message);
        document.getElementById('authStatus').innerText = `Error: ${error.message}`;
    }
}

onAuthStateChanged(auth, (user) => {
    if (user) {
        alert("You are authenticated with Google");
        console.log(user);

        document.getElementById('firstName').value = user.displayName.split(' ')[0];
        document.getElementById('lastName').value = user.displayName.split(' ')[1] || '';
        document.getElementById('email').value = user.email;
    }
});

document.addEventListener("DOMContentLoaded", () => {
    const signInButton = document.getElementById("signInButton");
    const signOutButton = document.getElementById("signOutButton");

    if (signInButton) {
        signInButton.addEventListener("click", userSignIn);
    } else {
        console.error("SignInButton not found");
    }

    if (signOutButton) {
        signOutButton.addEventListener("click", userSignOut);
    } else {
        console.error("SignOutButton not found");
    }
});
