import React from 'react';

const SearchQuery = () => {
  return (
    <div id="search-default">
      <h1 className="title">SEARCH:</h1>
      <form
        action="/api/match"
        method="get"
        enctype="application/x-www-form-urlencoded"
        // onSubmit={handleSubmit}
      >
        <input type="text" className="searchbar" name="match" id="match" required />
        <input type="submit" />
      </form>
    </div>
  );
};

export default SearchQuery;
