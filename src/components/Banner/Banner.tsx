import React, { Component } from 'react';
import './Banner.scss';

import { library } from '@fortawesome/fontawesome-svg-core';
import { fab } from '@fortawesome/free-brands-svg-icons';
import { far } from '@fortawesome/free-regular-svg-icons';
import { fas } from '@fortawesome/free-solid-svg-icons';
library.add(fab, far, fas);

interface IProps {
}
interface IState {
  textToDisplay?: string;
}

class Banner extends Component<IProps, IState> {
  text = ["Developer", "Student", "Photographer", "Writer"];

  interval: any;

  constructor(props: any) {
    super(props);
    this.state = { textToDisplay: "" }
  }

  componentWillMount() {
    let i = 0;
    let j = 1;
    let reverse = false;
    let halt = 4;
    this.interval = setInterval(() => {
      let nowText = this.text[i];
      this.setState({ textToDisplay: nowText.substr(0, j) });

      if (j === nowText.length && halt-- > 0) {
        return
      }
      if (j === nowText.length) {
        reverse = true;
        halt = 4
      }
      j += reverse ? -2 : 1;
      if (j <= 0) {
        j = 1;
        reverse = false;
        i++;
      }
      if (i === this.text.length) {
        i = 0;
      }
    }, 100);
  }

  render() {
    return (
        <div className="jumbotron jumbotron-fluid site-header">
          <div className="container">
            <div className="row">
              <div className="col-md-4">
                <h1 className="name">Niladri Roy</h1>
                <h2 className="title" >{this.state.textToDisplay}</h2>
              </div>
              <div className="col-md-3">
                <div className="profile nilroy"></div>
              </div>
              <div className="col-md-5">
                <h3>Full stack developer by the day</h3>
                <h3>Part time Student by the night</h3>
                <h3>Photographer during the vacation</h3>
              </div>
            </div>
          </div>
        </div>
    );
  }
}

export default Banner;
