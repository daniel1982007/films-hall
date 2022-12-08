import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getFilms } from "../actions/index";

const FilmList = () => {
  const dispatch = useDispatch();

  const films = useSelector((state) => state.films.films);

  console.log(films); //first run because first render, second run because useEffect getfilms, pass to reducer, and here useSelector runs

  useEffect(() => {
    dispatch(getFilms());
  }, [dispatch]); //when redirect from other location to this home '/', it will rerender, all components run, if state inside this component changes, useEffect will not run,, if nothing changes in []

  return !films?.length ? (
    <div className="m-3 text-center">
      {/* <div >No data here</div> */}
      <div className="spinner-border" role="status"></div>
    </div>
  ) : (
    <div className="container-md p-0 my-5 d-flex flex-column gap-5">
      <h1 className="mb-0 fs-1 fw-bold text-dark text-center">Films' list</h1>
      <div className="p-3">
        {films.map((film, index) => (
          <div className="container-sm p-0 text-center" key={index}>
            <div className="card mb-3">
              <div className="card-body bg-light d-flex justify-content-between">
                <h3 className="card-title">{film.Title}</h3>
                <Link
                  to={`/${film._id}`}
                  className="h6 p-2 border border-primary text-primary text-decoration-none rounded"
                >
                  Check detail
                </Link>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default FilmList;
