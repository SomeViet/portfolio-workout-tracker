import axios from "axios";
import { useEffect } from "react";
import "./Workouts.scss";

const SERVER_URL = process.env.REACT_APP_SERVER_URL;

export default function Workouts() {
    // variables i need - token/username/isLoggedIn
    let token = sessionStorage.authToken;

    // Load on mount - refreshing doesn't remount
    useEffect(() => {
        axios
            // Access workout data
            .get(`${SERVER_URL}/workout`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            })
            .then((response) => {
                console.log(response.data);
                console.log("workout data accessed");
            })
            .catch((error) => {
                console.log(error);
            });
    }, []);

    return (
        <>
            <section>
                {!token ? (
                    <h1>Please Login to access your workout data</h1>
                ) : (
                    <>
                        <div>Please login rawr</div>
                        <div>Please login</div>
                        <div>Please login moo</div>
                        <div>Please login</div>
                    </>
                )}
            </section>
        </>
    );
}
