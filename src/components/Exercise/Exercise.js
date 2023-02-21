import "./Exercise.scss";
import axios from "axios";

const SERVER_URL = process.env.REACT_APP_SERVER_URL;

export default function Exercise({
    id,
    exercise,
    sets,
    reps,
    weight,
    day,
    token,
    workoutData,
    setWorkoutData,
}) {
    let onHandleDeleteExercise = (e) => {
        e.preventDefault();
        // Payload with all the information for the mapped exercise
        let payload = {
            id: id,
            day: day,
            exercise: exercise,
            sets: sets,
            reps: reps,
            weight: weight,
        };
        // Delete exercise line
        axios
            .delete(`${SERVER_URL}/workout/deleteexercise`, {
                headers: {
                    Authorization: token,
                },
                // Axios delete request requires the data option
                data: payload,
            })
            .then((response) => {
                // If successful, filter out the exercise Id from workoutdata and update state.
                if (response.status === 200) {
                    let updatedWorkoutData = workoutData.filter((exercise) => {
                        return exercise.exercise_id !== payload.id;
                    });
                    setWorkoutData(updatedWorkoutData);
                }
            })
            .catch((error) => {
                console.log(error);
            });
    };

    return (
        <div className="exercise">
            <span className="exercise__name">{exercise}</span>
            <span className="exercise__sets">{sets}</span>
            <span className="exercise__reps">{reps}</span>
            <span className="exercise__weight">{weight}</span>
            <button
                className="exercise__delete"
                onClick={onHandleDeleteExercise}
            >
                Delete Exercise
            </button>
        </div>
    );
}
