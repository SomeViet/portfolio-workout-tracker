import "./WorkoutOutputs.scss";
import React, { useState, useEffect } from "react";
import { Exercise } from "../index.js";

export default function WorkoutOutputs({
    activeWeek,
    uniqueWeeks,
    workoutData,
}) {
    let [activeExercises, setActiveExercises] = useState();

    let daysInWeek = [
        "Sunday",
        "Monday",
        "Tuesday",
        "Wednesday",
        "Thursday",
        "Friday",
        "Saturday",
    ];

    useEffect(() => {
        // Filter out exercises for active week
        if (workoutData && activeWeek) {
            let filteredExercises = workoutData.filter((exercise) => {
                // the + notation converts activeWeek to a value
                return +activeWeek === exercise.week_id;
            });
            setActiveExercises(filteredExercises);

            // otherwise, filter out exercises for latest week
        } else if (workoutData && activeWeek) {
            let filteredExercises = workoutData.filter((exercise) => {
                // the + notation converts activeWeek to a value
                return uniqueWeeks[0] === exercise.week_id;
            });
            setActiveExercises(filteredExercises);
        }
    }, [activeWeek, uniqueWeeks, workoutData]);

    if (!activeWeek) {
        return null;
    }

    return (
        <section className="workout-outputs">
            <div className="workout-outputs__header">
                <span className="workout-outputs__name">Workout Data</span>
                <span className="workout-outputs__sets">Sets</span>
                <span className="workout-outputs__reps">Reps</span>
                <span className="workout-outputs__weight">Weight</span>
            </div>
            {activeExercises
                ? daysInWeek.map((day, index) => {
                      let dayExercise = activeExercises.filter((exercise) => {
                          return exercise.day === day;
                      });

                      return (
                          <React.Fragment key={index}>
                              {dayExercise.length > 0 ? (
                                  <React.Fragment key={index}>
                                      <h3> {day}</h3>
                                      {dayExercise.map(
                                          ({
                                              id,
                                              exercise,
                                              reps,
                                              sets,
                                              weight,
                                          }) => {
                                              return (
                                                  <React.Fragment key={id}>
                                                      <Exercise
                                                          key={id}
                                                          exercise={exercise}
                                                          sets={sets}
                                                          reps={reps}
                                                          weight={weight}
                                                      />
                                                  </React.Fragment>
                                              );
                                          }
                                      )}
                                  </React.Fragment>
                              ) : null}
                          </React.Fragment>
                      );
                  })
                : null}
        </section>
    );
}
