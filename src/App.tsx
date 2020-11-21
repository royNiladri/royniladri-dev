import React from 'react';
import './App.scss';
// import Contact from './components/contact/Contact';
import Banner from './components/Banner/Banner';

import { library } from '@fortawesome/fontawesome-svg-core';
import { fab } from '@fortawesome/free-brands-svg-icons';
import { far } from '@fortawesome/free-regular-svg-icons';
import { fas } from '@fortawesome/free-solid-svg-icons';
import Footer from './shared/Footer';
library.add(fab, far, fas);

function App() {
  return (
    <div className="App" >
      <Banner></Banner>
      <Footer></Footer>
    </div>
  );
}

export default App;
