import React from "react";
import Lyrics from "./Components/Lyrics";
import Stream from "./Components/Stream";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import "./App.css";

const App = () => (
  <Router>
    <div>
      <Header />
      <Route exact path="/" component={Home} />
      <Route path="/lyrics" component={Lyrics} />
      <Route path="/stream" component={Stream} />
    </div>
  </Router>
);

const Header = () => (
  <ul>
    <li>
      <Link to="/">Home</Link>
    </li>
    <li>
      <Link to="/lyrics">Lyrics</Link>
    </li>
    <li>
      <Link to="/stream">Stream</Link>
    </li>
  </ul>
);

const Home = () => <h2>Home</h2>;

export default App;
