import React from "react";
import Lyrics from "./Components/Lyrics";
import Stream from "./Components/Stream";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import "./App.css";

const App = () => (
  <Router>
    <div>
      <Header />
      <Route exact path="/" component={Lyrics} />
      <Route path="/lyrics" component={Lyrics} />
      <Route path="/stream" component={Stream} />
    </div>
  </Router>
);

const Header = () => (
  <div>
    <br />
    <Link
      style={{ textDecoration: "none", width: "150px" }}
      className="button"
      to="/lyrics"
    >
      My Lyrics
    </Link>
    <br />
    <Link
      style={{ textDecoration: "none", width: "150px" }}
      className="button"
      to="/stream"
    >
      Radio Stream
    </Link>
  </div>
);

export default App;
