import "./Exercise.scss";

export default function Exercise({ id, exercise, sets, reps, weight }) {
    return (
        <div className="exercise">
            <span className="exercise__name">{exercise}</span>
            <span className="exercise__sets">{sets}</span>
            <span className="exercise__reps">{reps}</span>
            <span className="exercise__weight">{weight}</span>
            <button className="exercise__delete">Delete</button>
        </div>
    );
}
