import React, { useState } from 'react';

export const Search = ({ isLoading, onSearch }) => {

  const [query, setQuery] = useState();

  const search = () => {
    if (onSearch) {
      onSearch(query);
    }
  };

  return (
    <div className="field has-addons">
      <div className="control">
        <input
          className="input"
          type="text"
          disabled={isLoading ? 'disabled' : ''}
          onChange={(event) => {
            setQuery(event.target.value);
          }}
          onKeyPress={event => {
            if (event.key === 'Enter') {
              search();
            }
          }}
        />
      </div>
      <div className="control">
        <button className={`button is-success ${isLoading ? 'is-loading' : ''}`} onClick={search}>Search</button>
      </div>
    </div>
  );
}
