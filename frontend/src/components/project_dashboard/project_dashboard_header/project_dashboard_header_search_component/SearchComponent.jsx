import Form from "react-bootstrap/Form";

const SearchComponent = ({ handleSearchChange, searchTerm }) => {
  return (
    <div>
      <Form className="d-flex" role="search" method="POST">
        <input
          className="form-control"
          type="search"
          id="search-input"
          name="search-input"
          placeholder="Search"
          aria-label="Search"
          value={searchTerm}
          onChange={handleSearchChange}
        />
      </Form>
    </div>
  );
};

export default SearchComponent;
