import "./SignIn.scss";
import { useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

const SERVER_URL = process.env.REACT_APP_SERVER_URL;

// For clarity, this is manual signin
export default function SignIn({ grabSignInData }) {
    const [notFilled, setNotFilled] = useState(false);
    const [passwordFailure, setPasswordFailure] = useState(false);

    function handleSignIn(e) {
        e.preventDefault();

        let username = e.target.signin_username.value;
        let password = e.target.signin_password.value;
        // Check if both fields are entered
        if (username && password) {
            setNotFilled(false);
            axios
                .post(`${SERVER_URL}/auth/login`, {
                    username: username,
                    password: password,
                    github_id: "",
                })
                .then((response) => {
                    setPasswordFailure(response.data.incorrect);
                    // Send sign-in data to home page
                    grabSignInData(
                        response.data.token,
                        response.data.name,
                        response.data.userid
                    );
                })
                .catch((error) => {
                    // Clear our session and return incorrect input
                    setPasswordFailure(error.response.data.incorrect);
                    sessionStorage.setItem(
                        "authToken",
                        error.response.data.token
                    );
                    console.log(error.response.data);
                });
        } else {
            setNotFilled(true);
        }
    }

    return (
        <>
            <section className="signin">
                <form className="signin__form" onSubmit={handleSignIn}>
                    <input
                        placeholder="Username"
                        className="signin__input"
                        id="signin_username"
                    />
                    <input
                        type="password"
                        placeholder="Password"
                        className="signin__input"
                        id="signin_password"
                    />
                    <button className="signin__submit">Submit</button>
                </form>

                {notFilled && (
                    <p className="signin__error">
                        Please fill in all fields to sign in.
                    </p>
                )}
                {passwordFailure && (
                    <p className="signin__error">
                        Incorrect Username and/or Password.
                    </p>
                )}

                <div className="signin__signup">
                    <p className="signin__signup-text">
                        Don't have an account?
                    </p>
                    <Link to="/signup" className="signin__signup-link">
                        Sign up
                    </Link>
                </div>
            </section>
        </>
    );
}
