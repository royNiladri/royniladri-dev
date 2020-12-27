import React, { Component } from 'react';
import './Banner.scss';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Contact from '../../shared/contact/Contact';

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

  componentDidMount() {
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
        <div className="site-header">
          <div className="container">
            <div className="row">
              <div className="col-md-3">
                <div className="profile nilroy"></div>
              </div>
              <div className="col-md-4">
                <h1 className="name">Niladri Roy</h1>
                <h3 className="role" >Lead Software Engineer</h3>
                <h2 className="title" >{this.state.textToDisplay}</h2>
              </div>
              <div className="col-md-5 intro">
                <div className="work"><FontAwesomeIcon icon={['far', 'building']}/> Informatica | Visa Inc.</div>
                <div className="edu"><FontAwesomeIcon icon={['fas', 'graduation-cap']}/> Georgia Tech | Jadavpur University</div>
                <Contact></Contact>
              </div>
            </div>
          </div>
        </div>
    );
  }
}

export default Banner;
