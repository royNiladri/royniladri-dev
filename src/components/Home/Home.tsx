import React from "react";
import "./Home.scss";
import { Link } from "react-router-dom";

function Home() {
  return (
    <div>
      {/* Work */}
      <div className="detail-pane work">
        <div className="row">
          <div className="col-md-4">
            <div className="image"></div>
          </div>
          <div className="col-md-8">
            <div className="row">
              <div className="col-md-6">
                <div className="company">Informatica</div>
                <div className="years">(2020 - Present)</div>
                <div className="designation">Principal Software Engineer</div>
                <div className="designation">Lead Software Engineer</div>
              </div>
              <div className="col-md-6">
                <div className="company">Visa</div>
                <div className="years">(2015 - 2020)</div>
                <div className="designation">Senior Software Engineer</div>
                <div className="designation">Software Engineer</div>
              </div>
            </div>
            <div className="row">
              <div className="col-md-12 text-center">
                <Link to="/work-history" className="btn btn-primary">
                  Go to Work History
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Education */}
      <div className="detail-pane school">
        <div className="row">
          <div className="col-md-5">
            <div className="company">Georgia Institute of Technology</div>
            <div className="years">(2020 - 2023)</div>
            <div className="designation">M.S. Computer Science</div>
          </div>
          <div className="col-md-4">
            <div className="company">Jadavpur University</div>
            <div className="years">(2011 - 2015)</div>
            <div className="designation">B.E. Electrical</div>
          </div>
          <div className="col-md-3 image"></div>
        </div>
      </div>
    </div>
  );
}

export default Home;
