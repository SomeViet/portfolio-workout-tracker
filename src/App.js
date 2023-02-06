import "./App.scss";
import { Header, Mockup, SignUp } from "./components/index";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import { Home, Workouts } from "./pages/index";
import { useEffect, useState } from "react";

function App() {
    let [isLoggedIn, setIsLoggedIn] = useState(false);
    let [username, setUsername] = useState();
    let [name, setName] = useState();
    let [token, setToken] = useState();

    // If token exists from previous session, mount it
    useEffect(() => {
        if (sessionStorage.authToken) {
            setToken(sessionStorage.authToken);
            setName(sessionStorage.name);
            setUsername(sessionStorage.username);
            setIsLoggedIn(true);
        }
    }, [token]);

    return (
        <>
            <BrowserRouter>
                <Header />
                <Switch>
                    <Route path="/" exact>
                        <Home
                            isLoggedIn={isLoggedIn}
                            setIsLoggedIn={setIsLoggedIn}
                            name={name}
                            setName={setName}
                            setToken={setToken}
                        />
                    </Route>
                    <Route path="/workouts" exact>
                        <Workouts
                            username={username}
                            isLoggedIn={isLoggedIn}
                            token={token}
                        />
                    </Route>
                    <Route path="/workouts/:week">
                        <Workouts
                            username={username}
                            isLoggedIn={isLoggedIn}
                            token={token}
                        />
                    </Route>
                    <Route path="/signup" component={SignUp}></Route>
                    {/* To remove once mockup is done */}
                    <Route path="/mockup" component={Mockup}></Route>
                </Switch>
            </BrowserRouter>
        </>
    );
}

export default App;
