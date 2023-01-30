import "./App.scss";
import { Header, Mockup, SignUp } from "./components/index";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import { Home, Main } from "./pages/index";

function App() {
    return (
        <>
            <BrowserRouter>
                <Header />
                <Switch>
                    <Route path="/" exact component={Home}></Route>
                    <Route path="/main" component={(Main, Mockup)}>
                        {/* Dynamic Week entry for previous weeks - referencing older index IDs */}
                    </Route>
                    <Route path="/signup" component={SignUp}></Route>
                </Switch>
            </BrowserRouter>
        </>
    );
}

export default App;
