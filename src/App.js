import "./App.css";
import { Header, Mockup } from "./components/index";
import { BrowserRouter, Route, Switch } from "react-router-dom";

function App() {
    return (
        <>
            <Header />
            <BrowserRouter>
                <Switch>
                    <Route>{/* Home Page = Latest Week index entry */}</Route>
                    <Route>
                        {/* Dynamic Week entry for previous weeks - referencing older index IDs */}
                    </Route>
                    <Route>{/* Home Page = Latest Week index entry */}</Route>
                </Switch>
            </BrowserRouter>
            <Mockup />
        </>
    );
}

export default App;
