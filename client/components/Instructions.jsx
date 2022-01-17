import React from 'react';

const Instructions = () => (
  <div id="instructions">
    <h1 className="title">INSTRUCTIONS:</h1>
    <ol>
      <li>Search for a match to base recommendations on</li>
      <li>Wait for our database to work its magic</li>
      <li>Get matches back!</li>
    </ol>
    <div id="disclaimer">
      <p>Disclaimer:</p>
      <p>
        We&apos;re sorry if you get recommended a match involving one or more cancelled wrestlers.
      </p>
    </div>
  </div>
);

export default Instructions;
