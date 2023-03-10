import "./WorkoutInputs.scss";
import { useState } from "react";
import axios from "axios";

const SERVER_URL = process.env.REACT_APP_SERVER_URL;

export default function WorkoutInputs({
    activeWeek,
    userId,
    token,
    workoutData,
    setWorkoutData,
}) {
    const formInitialDetails = {
        exercise: "",
        sets: "",
        reps: "",
        weight: "",
    };
    let [formInputs, setFormInputs] = useState(formInitialDetails);
    let [status, setStatus] = useState({});

    if (!activeWeek) {
        return null;
    }

    // Update form state - to use to reset afterwards
    let onFormUpdate = (category, value) => {
        setFormInputs({
            ...formInputs,
            [category]: value,
            week_id: activeWeek,
            userId: userId,
        });
    };

    // Workout Input form handler
    let workoutInputHandleSubmit = (e) => {
        e.preventDefault();

        // Check to ensure all inputs have been entered
        if (
            e.target[0].value &&
            e.target[1].value &&
            e.target[2].value &&
            e.target[3].value &&
            e.target[4].value
        ) {
            // If user didn't edit the Day, add Sunday to the payload
            let payload = formInputs;
            if (!payload.day) {
                payload.day = "Sunday";
            }

            // Convert payload string to integer
            payload.sets = Number(payload.sets);
            payload.reps = Number(payload.reps);
            payload.weight = Number(payload.weight);
            payload.week_id = Number(payload.week_id);

            // Send data to API
            axios
                .post(`${SERVER_URL}/workout/addexercise`, payload, {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                })
                // Success Message
                .then((response) => {
                    //  Get the newly generated exercise ID
                    let newExerciseId = response.data.exerciseId;
                    // Add exercise ID to payload, then create new workout Data
                    let completePayload = {
                        ...payload,
                        exercise_id: newExerciseId,
                    };
                    let updatedWorkoutData = [...workoutData, completePayload];

                    // Update workout data, to prevent needing a 2nd database ping
                    setWorkoutData(updatedWorkoutData);

                    // Reset inputs
                    setStatus({ sucesss: true, message: "Exercise Added" });

                    // Have initial form include day
                    let revisedInitialForm = {
                        ...formInitialDetails,
                        day: payload.day,
                    };

                    setFormInputs(revisedInitialForm);
                    // Move focus to exercise field
                    document.getElementById("exercise-input").focus();
                })
                .catch((error) => {
                    console.log(error);
                });
        } else {
            setStatus({
                success: false,
                message: "Please fill out all the fields",
            });
        }
    };

    return (
        <section className="workout-inputs">
            <h1 className="workout-inputs__week">Week {activeWeek}</h1>
            <form
                className="workout-inputs__form"
                onSubmit={workoutInputHandleSubmit}
            >
                <div className="workout-inputs__exercise-container">
                    <select
                        className="workout-inputs__day-selection"
                        onChange={(e) => {
                            onFormUpdate("day", e.target.value);
                        }}
                    >
                        <option value="Sunday">Sunday</option>
                        <option value="Monday">Monday</option>
                        <option value="Tuesday">Tuesday</option>
                        <option value="Wednesday">Wednesday</option>
                        <option value="Thursday">Thursday</option>
                        <option value="Friday">Friday</option>
                        <option value="Saturday">Saturday</option>
                    </select>
                    <input
                        className="workout-inputs__exercise-input"
                        placeholder="Exercise"
                        value={formInputs.exercise}
                        max="54"
                        id="exercise-input"
                        onChange={(e) => {
                            onFormUpdate("exercise", e.target.value);
                        }}
                    />
                    <input
                        type="number"
                        className="workout-inputs__exercise-input"
                        value={formInputs.sets}
                        placeholder="Sets"
                        max="100"
                        onChange={(e) => {
                            onFormUpdate("sets", e.target.value);
                        }}
                    />
                    <input
                        type="number"
                        className="workout-inputs__exercise-input"
                        value={formInputs.reps}
                        placeholder="Reps"
                        max="1000"
                        onChange={(e) => {
                            onFormUpdate("reps", e.target.value);
                        }}
                    />
                    <input
                        type="number"
                        className="workout-inputs__exercise-input"
                        placeholder="Weight"
                        value={formInputs.weight}
                        max="10000"
                        onChange={(e) => {
                            onFormUpdate("weight", e.target.value);
                        }}
                    />
                    <button> Add Exercise </button>
                </div>
            </form>
            {/* Error Message */}
            {status.message && <p>{status.message}</p>}
        </section>
    );
}
