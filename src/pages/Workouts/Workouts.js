import axios from "axios";
import { useState, useEffect } from "react";
import "./Workouts.scss";
import { SubNav, WorkoutInputs, WorkoutOutputs } from "../../components/index";
import { withRouter } from "react-router-dom";

const SERVER_URL = process.env.REACT_APP_SERVER_URL;

export default withRouter(function Workouts({
    isLoggedIn,
    userId,
    match,
    token,
}) {
    let [workoutData, setWorkoutData] = useState();
    let [uniqueWeeks, setUniqueWeeks] = useState([]);
    let [activeWeek, setActiveWeek] = useState();

    // Load on mount - refreshing doesn't remount
    useEffect(() => {
        if (token && userId) {
            axios
                // Access workout data
                .get(`${SERVER_URL}/workout`, {
                    // Axios isn't setup to send body data via Get Request, so to send user information via Params
                    params: { userId: userId },
                    headers: {
                        Authorization: token,
                    },
                })
                // Set the workout data to state to work with
                .then((response) => {
                    setWorkoutData(response.data.query);
                })
                .catch((error) => {
                    console.log(error);
                });
        }
    }, [token, userId]);

    // Load the latest week on render, or whatever the dynamic active week is
    useEffect(() => {
        if (workoutData) {
            // If there is no workout data for the user yet
            if (workoutData.length === 0 && uniqueWeeks.length === 0) {
                console.log("No initial data");
                setUniqueWeeks([1]);
            }

            // Get the amount of weeks the person has trained for - only on initial render
            if (workoutData.length > 0 && uniqueWeeks.length === 0) {
                // Extract all the weeks from the workout data
                let weeks = workoutData.map(({ week_id }) => {
                    return week_id;
                });

                // Isolate all the unique weeks into a new array, perform "numerical sorting", then sort in descending order
                setUniqueWeeks(
                    Array.from(new Set(weeks))
                        .sort(function (num1, num2) {
                            return num1 - num2;
                        })
                        .reverse()
                );
            }

            // Only load once when uniqueWeeks receives array data
            if (!match.params.week && uniqueWeeks.length > 0) {
                // Load latest week data
                setActiveWeek(Number(uniqueWeeks[0]));
            } else if ((match.params.week, workoutData)) {
                // Load active week data
                setActiveWeek(Number(match.params.week));
            }
        }
    }, [uniqueWeeks, match.params.week, workoutData]);

    return (
        <>
            <main className="workouts">
                {!isLoggedIn ? (
                    <h1 className="workouts__error">
                        Please Login to access your workout data
                    </h1>
                ) : (
                    <>
                        <SubNav
                            uniqueWeeks={uniqueWeeks}
                            setUniqueWeeks={setUniqueWeeks}
                            token={token}
                            userId={userId}
                            activeWeek={activeWeek}
                        />
                        <WorkoutInputs
                            activeWeek={activeWeek}
                            workoutData={workoutData}
                            userId={userId}
                            token={token}
                            setWorkoutData={setWorkoutData}
                        />
                        <WorkoutOutputs
                            activeWeek={activeWeek}
                            workoutData={workoutData}
                            uniqueWeeks={uniqueWeeks}
                            token={token}
                            setWorkoutData={setWorkoutData}
                        />
                    </>
                )}
            </main>
        </>
    );
});
