import React, { useState } from "react";
import { Link, useHistory } from "react-router-dom";
import { useDispatch } from "react-redux";

import { searchFilm } from "../actions/index";

const Navbar = () => {
  const dispatch = useDispatch();

  const history = useHistory();

  const [searchText, setSearchText] = useState("");

  const handleChange = (e) => {
    setSearchText(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(searchFilm(searchText));
    history.push("/");
  };

  return (
    <nav className="navbar navbar-dark bg-primary p-3">
      <div className="container-fluid flex-column flex-md-row p-0">
        <Link to="/" className="h2 mb-0 text-decoration-none text-light">
          Film-Store
        </Link>
        <div className="d-flex flex-column gap-3 flex-md-row align-items-center py-2 py-md-0">
          <Link to="/add" className="m-0">
            <i className="fas fa-plus-circle fa-2x text-light"></i>
          </Link>
          <form className="d-flex gap-3" onSubmit={handleSubmit}>
            <input
              className="form-control"
              type="search"
              placeholder="Search"
              aria-label="Search"
              onChange={handleChange}
              value={searchText}
            />
            <button
              className="btn btn-outline-light bg-primary text-light"
              type="submit"
            >
              Search
            </button>
          </form>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
