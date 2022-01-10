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
    dispatch(setStartMatch(formVal));
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
    dispatch(fetchMatchNames());
  }, []);

  useEffect(() => {
    if (typeof timeoutID === 'number') {
      console.log('timeout reset');
      clearTimeout(timeoutID);
      setFuzzResult('Loading...');
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
            disabled={fuzzResult.length && fuzzResult !== "Loading..." ? false : true}
            onClick={fuzzResult.length && fuzzResult !== "Loading..." ? handleSubmit : null}
          >
            SEARCH
          </button>
          {fuzzResult.length ? (
            <ul id="fuzz-results">
              {Array.isArray(fuzzResult)
                ? fuzzResult.map((resultObj) => (
                    <li key="resultObj.item" onClick={handleClick}>
                      {resultObj.item}
                    </li>
                  ))
                : fuzzResult}
            </ul>
          ) : startMatch ? (
            <div id="start-match">
              <p>Viewing results for:</p>
              <p>{startMatch}</p>
            </div>
          ) : null}
        </div>
      </form>
    </div>
  );
};

export default SearchQuery;
