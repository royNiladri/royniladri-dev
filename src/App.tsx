import React from 'react';
import './App.scss';
import Contact from './components/contact/Contact';
import Banner from './components/Banner/Banner';

import { library } from '@fortawesome/fontawesome-svg-core';
import { fab } from '@fortawesome/free-brands-svg-icons';
import { far } from '@fortawesome/free-regular-svg-icons';
import { fas } from '@fortawesome/free-solid-svg-icons';
library.add(fab, far, fas);

function App() {
  return (
    <div className="App" >
      <Banner></Banner>
      {/* <div className="container">
        <Contact></Contact>
        <div className="v-spacer"></div>
        <div className="row">
          <div className="col-md-4"><h2>Work</h2></div>
          <div className="col-md-4"><h2>Study</h2></div>
          <div className="col-md-4"><h2>Life</h2></div>
        </div>
      </div> */}
    </div>
  );
}

export default App;
