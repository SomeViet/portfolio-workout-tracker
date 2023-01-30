import { Link, NavLink } from "react-router-dom";

export default function Header() {
    return (
        <section className="header">
            <div className="header__bottom">
                <Link className="header__logo" to="/">
                    Simple Workouts
                </Link>
                <nav className="header__nav">
                    <NavLink
                        className="header__nav-link"
                        activeClassName="header__nav-link--active"
                        to="/"
                        exact
                    >
                        Home
                    </NavLink>
                    <NavLink
                        className="header__nav-link"
                        activeClassName="header__nav-link--active"
                        to="/main"
                        exact
                    >
                        Workouts
                    </NavLink>
                    <div>Logout</div>
                </nav>
            </div>
        </section>
    );
}
