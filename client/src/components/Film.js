import React from "react";
import { useParams, Link, useHistory } from "react-router-dom";
import { useDispatch } from "react-redux";
import { deleteFilm } from "../actions/index";

const Film = () => {
  const { id } = useParams();
  console.log(id);

  const dispatch = useDispatch();
  const history = useHistory();

  //1, if refresh, films will be empty
  //2, if add new, films are not updated

  const film = JSON.parse(localStorage.getItem("films")).find(
    (film) => film._id === id
  );
  console.log(film);

  //const film = films.find(film => film._id === id)

  const handleDelete = () => {
    console.log(deleteFilm(film._id));
    dispatch(deleteFilm(film._id));
    history.push("/");
  };

  return (
    <div className="container-sm py-3">
      <div className="card">
        <div className="card-header">
          <h3 className="text-dark">
            Wonderful film: <span className="m-3 fw-bold">{film.Title}</span>
          </h3>
        </div>
        <div className="card-body bg-light">
          <div className="p-3">
            <h4 className="text-center text-dark">
              Release year of this film:
            </h4>
            <h4 className="text-center text-dark fw-bold">
              {film.ReleaseYear}
            </h4>
          </div>
          <div className="p-3">
            <h4 className="text-center text-dark">Film format:</h4>
            <h4 className="text-center text-dark fw-bold">{film.Format}</h4>
          </div>
          <div className="p-3">
            <h4 className="text-center text-dark">All actors in this film:</h4>
            <h4 className="text-center text-dark fw-bold">{film.Stars}</h4>
          </div>
        </div>
        <div className="card-footer d-flex justify-content-between">
          <Link to="/" className="btn btn-primary m-3">
            Back to film list
          </Link>
          <button className="btn btn-danger m-3" onClick={handleDelete}>
            Delete
          </button>
        </div>
      </div>
    </div>
  );
};

export default Film;
