import "./App.scss";
import { Header } from "./components/index";
import { Route, Switch, HashRouter } from "react-router-dom";
import { Home, Workouts, SignUp } from "./pages/index";
import { useEffect, useState } from "react";

function App() {
    let [isLoggedIn, setIsLoggedIn] = useState(false);
    let [userId, setUserId] = useState();
    let [name, setName] = useState();
    let [token, setToken] = useState();

    // If token exists from previous session, mount it
    useEffect(() => {
        if (sessionStorage.authToken) {
            setToken(sessionStorage.authToken);
            setName(sessionStorage.name);
            setUserId(Number(sessionStorage.userId));
            setIsLoggedIn(true);
        }
    }, [token]);

    return (
        <>
            <HashRouter>
                <Header />
                <Switch>
                    <Route path="/" exact>
                        <Home
                            isLoggedIn={isLoggedIn}
                            setIsLoggedIn={setIsLoggedIn}
                            name={name}
                            userId={userId}
                            setToken={setToken}
                        />
                    </Route>
                    <Route path="/workouts" exact>
                        <Workouts
                            userId={userId}
                            isLoggedIn={isLoggedIn}
                            token={token}
                        />
                    </Route>
                    <Route path="/workouts/:week">
                        <Workouts
                            userId={userId}
                            isLoggedIn={isLoggedIn}
                            token={token}
                        />
                    </Route>
                    <Route path="/signup" component={SignUp}></Route>
                </Switch>
            </HashRouter>
        </>
    );
}

export default App;
