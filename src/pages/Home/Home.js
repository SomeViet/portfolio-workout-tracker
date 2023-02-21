import "./Home.scss";
import { useEffect } from "react";
import axios from "axios";
import {
    GitHubLoginButton,
    LogOutButton,
    SignIn,
} from "../../components/index.js";

const SERVER_URL = process.env.REACT_APP_SERVER_URL;

export default function Home({
    isLoggedIn,
    setIsLoggedIn,
    name,
    setToken,
    userId,
}) {
    // On mount
    useEffect(() => {
        // If client has a prev. session token, load it
        if (sessionStorage.authToken) {
            setToken(sessionStorage.authToken);
        } else {
            // Otherwise check if there is a github session.
        }
    }, [setToken]);

    function grabSignInData(childToken, childName, childUserId) {
        sessionStorage.setItem("authToken", childToken);
        sessionStorage.setItem("name", childName);
        sessionStorage.setItem("userId", childUserId);
        setToken(childToken);
    }

    return (
        <>
            <section className="home">
                <h1>Welcome to a simple workout tracker</h1>
                <p>To simplify your workout needs</p>
            </section>
            {isLoggedIn ? (
                <>
                    <h2 className="home__header-2">Hello {name}</h2>
                    <p className="home__text">You are currently logged in.</p>
                    <p className="home__text">
                        Please go to the workout tab to see your workouts
                    </p>
                    <span className="home__button">
                        <LogOutButton setIsLoggedIn={setIsLoggedIn} />
                    </span>
                </>
            ) : (
                <>
                    <h2 className="home__header-2">Please Log In</h2>
                    <div className="home__split-login">
                        <span className="home__split-login-container">
                            <SignIn grabSignInData={grabSignInData} />
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
