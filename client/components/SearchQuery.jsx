import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Fuse from 'fuse.js';
import { fetchMatchNames, setStartMatch, fetchResults } from '../redux';

const SearchQuery = () => {
  const dispatch = useDispatch();
  const { allMatches, startMatch } = useSelector((state) => state.search);

  const [formVal, setFormVal] = useState('');
  const [fuzzResult, setFuzzResult] = useState([]);
  const [timeoutID, setTimeoutID] = useState(undefined);

  const options = {
    threshold: 0.35,
    ignoreLocation: true,
  };
  const fuse = new Fuse(allMatches, options);

  const clearAll = () => {
    setFormVal('');
    setFuzzResult([]);
    setTimeoutID(undefined);
  };

  const handleSubmit = (evt) => {
    evt.preventDefault();
    const startQuery = formVal;
    clearAll();
    dispatch(setStartMatch(startQuery));
    dispatch(fetchResults(encodeURIComponent(startQuery)));
  };

  const handleChange = (evt) => {
    setFormVal(evt.target.value);
  };

  const handleClick = (evt) => {
    clearAll();
    dispatch(setStartMatch(evt.target.innerText));
    dispatch(fetchResults(encodeURIComponent(evt.target.innerText)));
  };

  useEffect(() => {
    if (!allMatches.length) {
      dispatch(fetchMatchNames());
    }
  }, []);

  useEffect(() => {
    if (typeof timeoutID === 'number') {
      console.log('timeout reset');
      clearTimeout(timeoutID);
    }
    if (formVal.length) {
      setFuzzResult('Loading...');
      setTimeoutID(
        setTimeout(() => {
          setFuzzResult(fuse.search(formVal, { limit: 15 }));
        }, 1500),
      );
    }
  }, [formVal]);

  useEffect(() => (clearAll()), []);

  const FuzzResults = (props) => {
    const { fuzzReturn } = props;

    return (
      <ul id="fuzz-results">
        {Array.isArray(fuzzReturn)
          ? fuzzReturn.map((resultObj) => (
            <button type="button" key="resultObj.item" onClick={handleClick}>
              {resultObj.item}
            </button>
          ))
          : fuzzReturn}
      </ul>
    );
  };

  const StartMatchDiv = (props) => {
    const { matchCheck } = props;

    return (
      matchCheck ? (
        <div id="start-match">
          <p>Viewing results for:</p>
          <p>{matchCheck}</p>
        </div>
      ) : null
    );
  };

  return (
    <div id="search-default">
      <h1 className="title">SEARCH:</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          className="searchbar"
          name="m"
          id="m"
          required
          value={formVal}
          onChange={handleChange}
        />
        <div id="under-searchbar">
          <button
            type="button"
            disabled={!(fuzzResult.length && fuzzResult !== 'Loading...')}
            onClick={fuzzResult.length && fuzzResult !== 'Loading...' ? handleSubmit : null}
          >
            SEARCH
          </button>
          {fuzzResult.length ? (
            <FuzzResults fuzzReturn={fuzzResult} />
          ) : (
            <StartMatchDiv matchCheck={startMatch} />
          ) }
        </div>
      </form>
    </div>
  );
};

export default SearchQuery;
