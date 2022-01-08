import React from 'react';
import { useSelector } from 'react-redux';
import SearchQuery from './SearchQuery';
import Results from './Results';
import Instructions from './Instructions';

const MainSearch = () => {
  const results = useSelector((state) => state.results);
  const startMatch = useSelector((state) => state.search.startMatch);

  return (
    <div id="main">
      <SearchQuery />
      {results.length ? (
        <Results />
      ) : startMatch ? (
        <p id="no-results">Sorry, there were no results for this search.</p>
      ) : (
        <Instructions />
      )}
    </div>
  );
};

export default MainSearch;
