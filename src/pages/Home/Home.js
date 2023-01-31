import "./Home.scss";
import { useState, useEffect } from "react";
import axios from "axios";
import {
    GitHubLoginButton,
    LogOutButton,
    SignIn,
} from "../../components/index.js";

const SERVER_URL = process.env.REACT_APP_SERVER_URL;

export default function Home() {
    let [state, setState] = useState({
        isAuthenticating: true,
        isLoggedIn: false,
        profileData: null,
    });

    let {
        // isAuthenticating,
        isLoggedIn,
        profileData,
    } = state;
    // On mount
    useEffect(() => {
        axios
            .get(`${SERVER_URL}/auth/profile`, { withCredentials: true })
            .then((res) => {
                console.log(res);
                setState({
                    isAuthenticating: false,
                    isLoggedIn: true,
                    profileData: res.data,
                });
            })
            .catch((error) => {
                if (error.response.status === 401) {
                    setState({
                        isAuthenticating: false,
                        isLoggedIn: false,
                    });
                } else {
                    console.log("Error Authenticating: ", error);
                }
            });
    }, []);

    return (
        <>
            <section className="home">
                <h1>Welcome to a simple workout tracker</h1>
                <p>To simplify your workout needs</p>
            </section>
            {isLoggedIn ? (
                <>
                    <h2 className="home__header-2">
                        Hello, {profileData.name}
                    </h2>
                    <p className="home__text">You are currently logged in.</p>
                    <p className="home__text">
                        Please go to the workout tab to see your workouts
                    </p>
                    <span className="home__button">
                        <LogOutButton />
                    </span>
                </>
            ) : (
                <>
                    <h2 className="home__header-2">Please Log In</h2>
                    <div className="home__split-login">
                        <span className="home__split-login-container">
                            <SignIn />
                        </span>

                        <span className="home__split-login-container">
                            <GitHubLoginButton />
                        </span>
                    </div>
                </>
            )}
        </>
    );
}
