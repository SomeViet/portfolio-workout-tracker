import "./SubNav.scss";
import { Link } from "react-router-dom";
import { withRouter } from "react-router-dom";

export default withRouter(function SubNav({ uniqueWeeks, setUniqueWeeks }) {
    let onHandleAddWeek = () => {
        console.log(uniqueWeeks);
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
                Add A Week
            </button>
            <button className="subnav__button">Copy Prev Week</button>
            {/* Add a prompt - Are you sure? */}
            <button className="subnav__button">Delete Current Week</button>
        </nav>
    );
});
