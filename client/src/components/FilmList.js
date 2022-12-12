import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getFilms } from "../actions/index";
import Pagination from "./Pagination";
import FilmItem from "./FilmItem";

const FilmList = () => {
  let { page } = useParams();
  page = !page ? 1 : parseInt(page);

  const dispatch = useDispatch();

  const films = useSelector((state) => {
    console.log(state.films.films);
    return state.films.films;
  });

  useEffect(() => {
    dispatch(getFilms());
  }, [dispatch]);

  return !films?.length ? (
    <div className="m-3 text-center">
      {/* <div >No data here</div> */}
      <div className="spinner-border" role="status"></div>
    </div>
  ) : (
    <div className="container-md my-5">
      <h1 className="mb-5 fs-1 fw-bold text-dark text-center">Films' list</h1>
      <div className="row">
        {films.slice((page - 1) * 9, page * 9).map((film, index) => (
          <div className="col-12 col-sm-6 col-md-4 col-lg-3 p-3" key={index}>
            <FilmItem film={film} page={page} />
          </div>
        ))}
      </div>
      <Pagination films={films} page={page} />
    </div>
  );
};

export default FilmList;
