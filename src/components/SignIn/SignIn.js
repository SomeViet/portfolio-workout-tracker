import "./SignIn.scss";

export default function SignIn() {
    return (
        <>
            <section className="signin">
                <form className="signin__form">
                    <input placeholder="Username" className="signin__input" />
                    <input placeholder="Password" className="signin__input" />
                    <button className="signin__submit">Submit</button>
                </form>
                <div className="signin__signup">
                    <p className="signin__signup-text">
                        Don't have an account?
                    </p>
                    <a href="/signup" className="signin__signup-link">
                        Sign up
                    </a>
                </div>
            </section>
        </>
    );
}
