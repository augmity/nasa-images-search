import React, { useState } from 'react';
import './search.css';


export const Search = ({ isLoading, onSearch, onClear }) => {

  const [query, setQuery] = useState('');

  const search = () => {
    if (onSearch) {
      onSearch(query);
    }
  };

  const clear = () => {
    setQuery('');
    if (onClear) {
      onClear();
    }
  }

  return (
    <div className="field has-addons">
      <div className="control has-icons-right">
        <input
          className="input"
          type="text"
          disabled={isLoading ? 'disabled' : ''}
          value={query}
          onChange={(event) => {
            setQuery(event.target.value);
          }}
          onKeyPress={event => {
            if (event.key === 'Enter') {
              search();
            }
          }}
        />
        {(query && query !== '') &&
          <span className="icon is-small is-right" onClick={clear}>
            <span className="clear"></span>
          </span>}
      </div>
      <div className="control">
        <button className={`button is-success ${isLoading ? 'is-loading' : ''}`} onClick={search}>Search</button>
      </div>
    </div>
  );
}
