import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';

const Results = () => {
  const results = useSelector((state) => state.results);

  const [page, setPage] = useState(1);

  const loadMore = (evt) => {
    evt.preventDefault();
    setPage(page + 1);
  };

  useEffect(() => {
    setPage(1);
  }, [results[0][0]]);

  return (
    <div id="results">
      <ul>
        {results.slice(0, 10 + 5 * (page - 1)).map((match) => (
          <li key={match[0]}>
            <a href={`https://www.cagematch.net/?id=111&nr=${match[1]}`} target="_blank" rel="noopener noreferrer">{decodeURI(match[0])}</a>
          </li>
        ))}
        <a href="#" onClick={loadMore}>
          Load More
        </a>
      </ul>
    </div>
  );
};

export default Results;
