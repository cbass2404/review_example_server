## React Setup

1. Navigate to the folder you want the project folder stored into then run:

```
$ npx create-react-app projectName
```

2. CD into the folder and install using npm:

```
$ npm install -- save react-router-dom
```

3. In index.js file inside src directory import react-dom and render it.

```javascript
import ReactDOM from "react-dom";

// local files
import App from "./components/App";

ReactDOM.render(<App />, document.querySelector("#root"));
```

_ReactDOM.render takes two args, component to render and target dom node_

4. Inside src/components make a file called app, import react-router-dom components and setup basic routes:

```javascript
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

// local files

// temp components
const Header = () => <h2>Header</h2>;
const Dashboard = () => <h2>Dashboard</h2>;
const SurveyNew = () => <h2>SurveyNew</h2>;
const Landing = () => <h2>Landing</h2>;
const NoMatch = () => <h2>Page not Found</h2>;

const App = () => {
    return (
        <div className="App">
            <Router>
                <Header />
                <Switch>
                    <Route exact path="/" component={Landing} />
                    <Route exact path="/surveys" component={Dashboard} />
                    <Route path="/surveys/new" component={SurveyNew} />
                    <Route component={NoMatch} />
                </Switch>
            </Router>
        </div>
    );
};

export default App;
```

_Inside router, anything outside the switch is static, inside switch is dynamic. Exact is only necessary if parts of the paths match_

5. Links vs a tags:

    > Links navigate to a new react route internally

    > A tags navigate to a new html document, mostly used for external links in react.
