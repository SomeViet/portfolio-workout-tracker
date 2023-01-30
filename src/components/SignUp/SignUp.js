import "./SignUp.scss";

export default function SignUp() {
    return (
        <>
            <section className="signup">
                <h1 className="signup__header">
                    Please enter in the following information to Sign Up:
                </h1>
                <form className="signup__form">
                    <input placeholder="Username" className="signup__input" />
                    <input placeholder="Password" className="signup__input" />
                    <input
                        placeholder="Display Name"
                        className="signup__input"
                    />
                    <button className="signup__button">Submit</button>
                </form>
            </section>
        </>
    );
}
