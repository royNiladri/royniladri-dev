import React from 'react';
import { Route, BrowserRouter as Router, Switch } from 'react-router-dom';

import './App.scss';

import Home from './components/Home/Home';
import WorkHistory from './components/WorkHistory';
import Banner from './components/Banner/Banner';
import Footer from './shared/Footer/Footer';

import { library } from '@fortawesome/fontawesome-svg-core';
import { fab } from '@fortawesome/free-brands-svg-icons';
import { far } from '@fortawesome/free-regular-svg-icons';
import { fas } from '@fortawesome/free-solid-svg-icons';
library.add(fab, far, fas);


function App() {
  return (
    <div className="App" >
      <Banner></Banner>

      <div className="container">
        <Router>
          <Switch>
            <Route exact path="/" component={Home}></Route>
            <Route path="/work-history" component={WorkHistory} />
            {/* <Route path="/contact" component={Contact}></Route> */}
          </Switch>
        </Router>
      </div>

      <Footer></Footer>
    </div>
  );
}

export default App;
