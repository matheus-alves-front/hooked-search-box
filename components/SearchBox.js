import { useState } from "react";
import Link from "next/link";
import styles from "styles/SearchBox.module.css";

const SearchHistoryItem = ({ term, index, onDeleteSearchTerm }) => {
  const link = "/?searchStr=" + term.searchStr;
  return (
    <div className="btn btn-secondary m-2">
      <a href={link} className={styles.termA}>
        {term.searchStr}
      </a>
      <span
        style={{
          marginLeft: 8,
        }}
        onClick={() => onDeleteSearchTerm(index)}
      >
        x
      </span>
    </div>
  );
};

const SearchBox = ({ history, onDeleteSearchTerm }) => {
  const [search, setSearch] = useState("");

  const findSearch = (e) => {
    setSearch(e.target.value);
  };

  return (
    <div className="col-lg-12 p-4">
      <div className="card mb-4">
        <div className="card-header">Search</div>
        <div className="card-body">
          <form action="/" method="post" className="d-flex flex-row">
            <input
              onChange={findSearch}
              className="form-control"
              type="text"
              placeholder="Enter search term..."
              aria-label="Enter search term..."
              aria-describedby="button-search"
            />

            <button
              className="mx-2 btn btn-primary"
              id="button-search"
              type="submit"
              disabled={!(search?.length > 0)}
            >
              <Link
                href={{
                  pathname: "/",
                  query: { searchStr: search?.toLowerCase() },
                }}
              >
                Go!
              </Link>
            </button>
          </form>
          <div className="mt-4">
            {history.map((term, index) => (
              <SearchHistoryItem
                key={index}
                term={term}
                index={index}
                onDeleteSearchTerm={onDeleteSearchTerm}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default SearchBox;
