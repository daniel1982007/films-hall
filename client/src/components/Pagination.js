import { Link } from "react-router-dom";

const Pagination = ({ films, page }) => {
  /* back ...23... next */
  //define the page object
  const last_page = Math.ceil(films.length / 9);
  const page_section = Math.ceil(page / 5);
  let page_n = Array(Math.ceil(films.length / 9))
    .fill()
    .map((_, i) => i + 1)
    .slice((page_section - 1) * 5, page_section * 5);

  if (page > 5 && page_section * 5 < Math.ceil(films.length / 9)) {
    page_n.unshift("...");
    page_n = page_n.concat("...");
    console.log(page_n);
  } else if (page > 5) {
    page_n.unshift("...");
  } else if (page <= 5 && page_section * 5 < Math.ceil(films.length / 9)) {
    page_n = page_n.concat("...");
  }

  console.log(page_n);

  return (
    <nav aria-label="Page navigation" className="d-flex justify-content-end">
      <ul className="pagination mb-0 d-flex gap-3">
        <li className="page-item">
          <Link
            to={`/${page - 1}`}
            style={{
              pointerEvents: page === 1 ? "none" : "auto",
            }}
            className={`page-link bg-light ${
              page === 1 ? "text-secondary" : "text-primary"
            }`}
          >
            Previous
          </Link>
        </li>
        {page_n.map((_, i) => (
          <li className={`page-item`} key={i}>
            <Link
              to={`/${
                i === 0 && _ === "..."
                  ? (page_section - 1) * 5
                  : i === page_n.length - 1 && _ === "..."
                  ? page_section * 5 + 1
                  : _
              }`}
              className={`page-link bg-light m-0 ${
                page === _ && "bg-dark text-light"
              }`}
            >
              {_}
            </Link>
          </li>
        ))}
        <li className="page-item">
          <Link
            to={`/${page + 1}`}
            style={{ pointerEvents: page === last_page ? "none" : "auto" }}
            className={`page-link bg-light ${
              page === last_page ? "text-secondary" : "text-primary"
            }`}
          >
            Next
          </Link>
        </li>
      </ul>
    </nav>
  );
};

export default Pagination;
