import axios from "axios";
import "./SignUp.scss";
import { useState } from "react";
import { Link } from "react-router-dom";

const SERVER_URL = process.env.REACT_APP_SERVER_URL;

export default function SignUp() {
    // Form's initial state
    const formInitialDetails = {
        formUsername: "",
        formPassword: "",
        formName: "",
    };

    const [notFilled, setNotFilled] = useState(false);
    const [duplicate, setDuplicate] = useState(false);
    const [signUpSuccessful, setSignUpSuccessful] = useState(false);
    const [formDetails, setFormDetails] = useState(formInitialDetails);

    // Update Form's state
    const onFormUpdate = (category, value) => {
        setFormDetails({ ...formDetails, [category]: value });
    };

    function handleSignUp(e) {
        e.preventDefault();

        let username = e.target.signup_username.value;
        let password = e.target.signup_password.value;
        let name = e.target.signup_name.value;

        // If all fields are not filled, notify user to fill all fields
        if (username && password && name) {
            setNotFilled(false);
            axios
                .post(`${SERVER_URL}/signup`, {
                    username: username,
                    password: password,
                    name: name,
                })
                .then((response) => {
                    console.log(response.data);
                    // Remove duplicate error
                    setDuplicate(response.data.duplicate);

                    // Notify user of succesful signup
                    setSignUpSuccessful(response.data.signUpSuccessful);

                    // Reset form field after sign-up
                    setFormDetails(formInitialDetails);
                })
                .catch((error) => {
                    console.log(error);
                    setDuplicate(error.response.data.duplicate);
                });
        } else {
            // Notify user some fields not filled in
            setDuplicate(false);
            setNotFilled(true);
            setSignUpSuccessful(false);
        }
    }

    return (
        <>
            <section className="signup">
                <h1 className="signup__header">
                    Please enter in the following information to Sign Up:
                </h1>
                <form className="signup__form" onSubmit={handleSignUp}>
                    <input
                        placeholder="Username"
                        className="signup__input"
                        id="signup_username"
                        maxLength="16"
                        value={formDetails.formUsername}
                        onChange={(e) => {
                            onFormUpdate("formUsername", e.target.value);
                        }}
                    />
                    <input
                        type="password"
                        placeholder="Password"
                        className="signup__input"
                        id="signup_password"
                        maxLength="20"
                        value={formDetails.formPassword}
                        onChange={(e) => {
                            onFormUpdate("formPassword", e.target.value);
                        }}
                    />
                    <input
                        placeholder="Display Name"
                        className="signup__input"
                        id="signup_name"
                        maxLength="12"
                        value={formDetails.formName}
                        onChange={(e) => {
                            onFormUpdate("formName", e.target.value);
                        }}
                    />
                    <button className="signup__button">Submit</button>
                    {notFilled && (
                        <p className="signup__error">
                            Please fill in all fields to sign up.
                        </p>
                    )}

                    {duplicate && (
                        <p className="signup__error">
                            Username has already been claimed. Please use a
                            different username.
                        </p>
                    )}

                    {signUpSuccessful && (
                        <>
                            <p className="signup__success">
                                Signup Successful.
                            </p>
                            <Link to={"/"}>
                                <p> Return to Home screen and Sign In.</p>
                            </Link>
                        </>
                    )}
                </form>
            </section>
        </>
    );
}
