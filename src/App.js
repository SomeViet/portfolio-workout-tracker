import "./App.scss";
import { Header, Mockup } from "./components/index";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import { Home, Workouts } from "./pages/index";

function App() {
    return (
        <>
            <BrowserRouter>
                <Header />
                <Switch>
                    <Route path="/" exact component={Home}></Route>
                    <Route path="/workouts" component={Workouts}>
                        {/* Dynamic Week entry for previous weeks - referencing older index IDs */}
                    </Route>
                    <Route path="/mockup" component={Mockup}></Route>
                </Switch>
            </BrowserRouter>
        </>
    );
}

export default App;
