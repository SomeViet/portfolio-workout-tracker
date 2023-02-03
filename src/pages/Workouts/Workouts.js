import axios from "axios";
import { useState, useEffect } from "react";
import "./Workouts.scss";
import { SubNav } from "../../components/index";

const SERVER_URL = process.env.REACT_APP_SERVER_URL;

export default function Workouts({ isLoggedIn, username }) {
    // variables i need - token/username/isLoggedIn
    let token = sessionStorage.authToken;
    let [workoutData, setWorkoutData] = useState();

    // Load on mount - refreshing doesn't remount
    useEffect(() => {
        axios
            // Access workout data
            .get(`${SERVER_URL}/workout`, {
                // Axios isn't setup to send body data via Get Request, so to send user information via Params
                params: { username: username },
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            })
            .then((response) => {
                setWorkoutData(response.data.query);
            })
            .catch((error) => {
                console.log(error);
            });
    }, [token, username]);

    return (
        <>
            <section>
                {!isLoggedIn ? (
                    <h1>Please Login to access your workout data</h1>
                ) : (
                    <>
                        <SubNav workoutData={workoutData} />
                        <div>Workout Data</div>
                    </>
                )}
            </section>
        </>
    );
}
