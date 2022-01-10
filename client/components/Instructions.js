import React from 'react';

const Instructions = () => {
  return (
    <div id="instructions">
      <h1 className="title">INSTRUCTIONS:</h1>
      <ol>
        <li>Type in your match of choice</li>
        <li>Wait for our database to work its magic</li>
        <li>Get matches back!</li>
      </ol>
      <div id="disclaimer">
        <p>Disclaimer:</p>
        <p>I'm sorry if the site recommends you a match with one or more cancelled wrestlers.</p>
      </div>
    </div>
  );
};

export default Instructions;
