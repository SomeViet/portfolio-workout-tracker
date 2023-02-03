import "./SubNav.scss";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";

export default function SubNav({ workoutData }) {
    let [uniqueWeeks, setUniqueWeeks] = useState([]);

    useEffect(() => {
        // Conditional statement for loading
        if (workoutData) {
            // Extract all the weeks from the workout data
            let weeks = workoutData.map(({ week_id }) => {
                return week_id;
            });

            // Isolate all the unique weeks into a new array, and sort in descending order
            setUniqueWeeks(Array.from(new Set(weeks)).sort().reverse());
        }
    }, [workoutData]);

    return (
        <>
            {uniqueWeeks.map((week) => {
                return (
                    // Unique key in list is weeks, as we already filtered for unique variables
                    <Link
                        to={"/workouts/" + week}
                        key={week}
                        className="subnav__week"
                    >
                        <div>Week {week}</div>
                    </Link>
                );
            })}
            <button className="subnav__button">Add A Week</button>
            <button className="subnav__button">Copy Prev Week</button>
            {/* Add a prompt - Are you sure? */}
            <button className="subnav__button">Delete Current Week</button>
        </>
    );
}
