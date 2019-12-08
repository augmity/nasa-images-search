import React from 'react';

import 'bulma/css/bulma.css';
import './App.css';

import { NasaImagesApiHook } from "./hooks/nasaImagesApi.hook";


function App() {

  let searchInput;
  const [{ data, isLoading, isError }, search] = NasaImagesApiHook();

  return (
    <>
      <section className="section">
        <div className="container">
          <h1 className="title">NASA Images Search</h1>
          <h2 className="subtitle">
            Type something (try "mars" or "earth") in the input below and click "Search" <span role="img" aria-label="smile">🙂</span>
          </h2>

          <div className="field has-addons">
            <div className="control">
              <input
                className="input"
                type="text"
                ref={input => searchInput = input}
                disabled={isLoading ? 'disabled' : ''}
                onKeyPress={event => {
                  if (event.key === 'Enter') {
                    search(searchInput.value);
                  }
                }}
              />
            </div>
            <div className="control">
              <button className={`button is-success ${isLoading ? 'is-loading' : ''}`} onClick={() => search(searchInput.value)}>Search</button>
            </div>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <div className="image-grid">
            {data && data.images && data.images.map(image => (
              <img src={image.uri} key={image.id} alt="" />        
            ))}            
          </div>
        </div>
      </section>
    </>
  );
}

export default App;
