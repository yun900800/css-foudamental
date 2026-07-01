import { BrowserRouter, Switch, Route, Link } from "react-router-dom";
// HashRouter 和 BrowserRouter 二者的使用方法几乎没有差别，这里只演示其一

const App = () => {
  return (
    <BrowserRouter>
        <Link to="/">Home</Link>
        <Link to="/about">About</Link>
        <Link to="/user">User</Link>

        <Switch>
            <Route path="/about"><About /></Route>
            <Route path="/user"> <User /></Route>
            <Route path="/"><Home /></Route>
        </Switch>
    </BrowserRouter>
  );
}

const Home = () => (<h2>Home</h2>);
const About = () => (<h2>About</h2>);
const User = () => (<h2>User</h2>);

export default App;