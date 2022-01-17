import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import SearchQuery from './SearchQuery';
import Results from './Results';
import Instructions from './Instructions';
import { clearResults, setStartMatch } from '../redux';

const MainSearch = () => {
  const results = useSelector((state) => state.results);
  const startMatch = useSelector((state) => state.search.startMatch);
  const dispatch = useDispatch();

  useEffect(
    () => () => {
      dispatch(clearResults());
      dispatch(setStartMatch(''));
    },
    [],
  );

  const BlankResults = (props) => {
    const { searchCheck } = props;

    return searchCheck ? (
      <p id="no-results">Sorry, there were no results for this search.</p>
    ) : (
      <Instructions />
    );
  };

  return (
    <div id="main">
      <SearchQuery />
      {results.length ? <Results /> : <BlankResults searchCheck={startMatch} />}
    </div>
  );
};

export default MainSearch;
