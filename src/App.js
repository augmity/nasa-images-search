import React from 'react';

import 'bulma/css/bulma.css';
import './App.css';

import { Search } from './components/search/search';
import { NasaImagesApiHook } from "./hooks/nasaImagesApi.hook";


function App() {

  const [{ data, isLoading, error }, search, clear] = NasaImagesApiHook();

  return (
    <>
      <section className="section">
        <div className="container">

          <h1 className="title">NASA Images Search</h1>
          <h2 className="subtitle">
            Type something (try "mars" or "earth") in the input below and click "Search" <span role="img" aria-label="smile">🙂</span>
          </h2>

          <Search isLoading={isLoading} onSearch={search} onClear={clear} />

          {error && 
            <div class="message is-danger">
              <div class="message-body">
                {error.message}
              </div>
            </div>}
        </div>
      </section>

      <section className="section">
        <div className="container">
          <div className="image-grid">
            {data && data.map(image => (
              <img src={image.uri} key={image.id} alt="" />        
            ))}            
          </div>
        </div>
      </section>
    </>
  );
}

export default App;
