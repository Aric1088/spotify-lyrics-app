import React from "react";
import Lyrics from "./Components/Lyrics";
import Stream from "./Components/Stream";
import Visual from "./Components/Visual";
import { BrowserRouter as Router, Route, NavLink } from "react-router-dom";
import "./App.css";

const App = () => (
  <Router>
    <div>
      <Header />
      <Route exact path="/" component={Lyrics} />
      <Route path="/lyrics" component={Lyrics} />
      <Route path="/stream" component={Stream} />
      <Route path="/visual" component={Visual} />
    </div>
  </Router>
);

const Header = () => (
  <div style={{ margin: "auto", textAlign: "center" }}>
    <a
      class="button"
      style={{ textDecoration: "none", width: "150px" }}
      href="https://github.com/Aric1088/spotify-lyrics-app"
      title="Github"
    >
      GitHub
    </a>

    <NavLink
      style={{ textDecoration: "none", width: "150px" }}
      className="button"
      to="/lyrics"
      activeClassName="active-button"
    >
      My Lyrics
    </NavLink>
    <NavLink
      style={{ textDecoration: "none", width: "150px" }}
      className="button"
      to="/visual"
      activeClassName="active-button"
    >
      Radio Stream
    </NavLink>
  </div>
);

export default App;
