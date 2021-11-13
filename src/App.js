import React from "react";
import Home from "./Components/Home";
import Nav from "./Components/Nav";
import { Switch, Route, Redirect } from "react-router";
import About from "./Components/About";
import Contact from "./Components/Contact";
import FormPage from "./Components/FormPage";

export default function App() {
  return (
    <div>
      <Nav />
      <Switch>
        <Route exact path="/">
          <Home />
        </Route>
        <Route path="/about">
          <About />
        </Route>
        <Route path="/contact">
          <Contact />
        </Route>
        <Route path="/form">
          <FormPage />
        </Route>
        <Route>
          <Redirect to="/" />
        </Route>
      </Switch>
    </div>
  );
}
