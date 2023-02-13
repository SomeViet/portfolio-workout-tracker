import "./SubNav.scss";
import { Link } from "react-router-dom";
import { withRouter } from "react-router-dom";
import axios from "axios";
import { useEffect } from "react";

const SERVER_URL = process.env.REACT_APP_SERVER_URL;

export default withRouter(function SubNav({
    uniqueWeeks,
    setUniqueWeeks,
    token,
    userId,
    activeWeek,
}) {
    // Buttons will lock on every add/copy/delete - state re-rendering
    let lockedAdd = true;
    let lockedDelete = true;
    // let lockedCopy = true;

    let unlockWeekButtons = () => {
        lockedAdd = false;
        lockedDelete = false;
        // lockedCopy = false;
    };

    useEffect(() => {
        setTimeout(unlockWeekButtons, 800);
    });

    let onHandleAddWeek = (e) => {
        e.preventDefault();

        // Create payload to add new week
        let addWeek = uniqueWeeks[0] + 1;
        let payload = { user_id: userId, week_id: addWeek };

        if (!lockedAdd) {
            axios
                .post(`${SERVER_URL}/workout/addweek`, payload, {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                })
                .then((response) => {
                    // If database addition successful, update Unique Weeks Array to display updated weeks
                    if (response.status === 200) {
                        let updatedUniqueWeek = [addWeek, ...uniqueWeeks];

                        setUniqueWeeks(updatedUniqueWeek);
                    }
                })
                .catch((error) => {
                    console.log(error);
                });
        } else {
            console.log("Anti-spam protection");
        }
    };

    let onHandleDeleteWeek = (e) => {
        e.preventDefault();

        // Create a payload to identify the week we are deleting
        let payload = { user_id: userId, week_id: activeWeek };

        if (!lockedDelete) {
            // Prompt user for confirmation
            if (
                window.confirm(
                    "Are you sure you want to delete the current week? \n \nNote: You are unable to delete week 1 and are unable to insert weeks in the middle"
                ) === true
            ) {
                // Prevent deletion of week 1
                if (activeWeek !== 1) {
                    axios
                        .delete(`${SERVER_URL}/workout/deleteweek`, {
                            headers: {
                                Authorization: `Bearer ${token}`,
                            },
                            // Axios delete request requires the data option
                            data: payload,
                        })
                        .then((response) => {
                            // If successful, filter out active week and updated unique week state
                            if (response.status === 200) {
                                let updatedUniqueWeek = uniqueWeeks.filter(
                                    (week) => {
                                        return week !== activeWeek;
                                    }
                                );
                                setUniqueWeeks(updatedUniqueWeek);
                                window.location.assign("/workouts/");
                            }
                        })
                        .catch((error) => {
                            console.log(error);
                        });
                } else {
                    console.log("Cannot delete Week 1");
                }
            } else {
                // Do nothing
                return;
            }
        } else {
            console.log("I am locked");
        }
    };

    return (
        <nav>
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
            <button className="subnav__button" onClick={onHandleAddWeek}>
                Add New Week
            </button>
            <button className="subnav__button" onClick={onHandleDeleteWeek}>
                Delete Selected Week
            </button>

            {/* <button className="subnav__button">
                Copy Current Week to New Week - Feature to be added
            </button> */}
        </nav>
    );
});
