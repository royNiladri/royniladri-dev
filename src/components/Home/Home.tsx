import React from 'react';
import './Home.scss';

function Home() {
    return (
        <div>
            {/* Work */}
            <div className="detail-pane work">
                <div className="row">
                    <div className="col-md-3 image"></div>
                    <div className="col-md-3">
                        <div className="company">Visa</div>
                        <div className="years">(2015 - 2018)</div>
                        <div className="designation">Software Engineer</div>
                    </div>
                    <div className="col-md-3">
                        <div className="company">Visa</div>
                        <div className="years">(2018 - 2020)</div>
                        <div className="designation">Senior Software Engineer</div>
                    </div>
                    <div className="col-md-3">
                        <div className="company">Informatica</div>
                        <div className="years">(2020 - Present)</div>
                        <div className="designation">Lead Software Engineer</div>
                    </div>
                </div>
            </div>

            {/* Education */}
            <div className="detail-pane school">
                <div className="row">
                    <div className="col-md-4">
                        <div className="company">Jadavpur University</div>
                        <div className="years">(2011 - 2015)</div>
                        <div className="designation">B.E. Electrical</div>
                    </div>
                    <div className="col-md-5">
                        <div className="company">Georgia Institute of Technology</div>
                        <div className="years">(2020 - Present)</div>
                        <div className="designation">M.S. Computer Science</div>
                    </div>
                    <div className="col-md-3 image"></div>
                </div>
            </div>
        </div>
    )
}

export default Home;