import React from "react";
import Navbar from "./components/Navbar";
import AddFilmForm from "./components/AddFilmForm";
import Film from "./components/Film";
import FilmList from "./components/FilmList";
import Foot from "./components/Foot";
import { ToastContainer, Slide } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import { Switch, Route } from "react-router-dom";

const App = () => {
  return (
    <div className="bg-light">
      <ToastContainer
        position="top-center"
        autoClose={2000}
        hideProgressBar
        transition={Slide}
      />
      <Navbar />

      <Switch>
        <Route exact path="/">
          <FilmList />
        </Route>
        <Route path="/add">
          <AddFilmForm />
        </Route>
        <Route path="/:id">
          <Film />
        </Route>
      </Switch>

      <Foot />
    </div>
  );
};

export default App;
