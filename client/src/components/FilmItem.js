import { Link } from "react-router-dom";
// import pic from "./Logo.svg";

const FilmItem = ({ film, page }) => {
  return (
    <div className="card h-100 shadow rounded">
      <img src={film.image} className="card-img-top mb-2" alt="" />
      <div className="card-body p-2 bg-light d-flex flex-column align-items-center justify-content-between">
        <h4 className="card-title text-center fw-lighter">{film.Title}</h4>
        <Link
          to={`/${page}/${film._id}`}
          className="h6 text-light text-decoration-none btn bg-primary bg-gradient"
        >
          Check detail
        </Link>
      </div>
    </div>
  );
};

export default FilmItem;
