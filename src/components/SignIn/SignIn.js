import "./SignIn.scss";
import { useState } from "react";

export default function SignIn() {
    const [notFilled, setNotFilled] = useState(false);
    const [passwordFailure, setPasswordFailure] = useState(false);

    function handleSignIn(e) {
        e.preventDefault();

        let username = e.target.signin_username.value;
        let password = e.target.signin_password.value;

        if (username && password) {
            console.log("Connection Good");
        } else {
            console.log("test2");
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

                <div className="signin__signup">
                    <p className="signin__signup-text">
                        Don't have an account?
                    </p>
                    <a href="/signup" className="signin__signup-link">
                        Sign up
                    </a>
                </div>
            </section>
        </>
    );
}
