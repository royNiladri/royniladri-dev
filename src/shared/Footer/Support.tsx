import React from 'react';
import './Footer.scss';

import bmc from '../../assets/images/bmc-logo.svg';

function Support() {
    return (
        <div className="support">
            <div className="support-links">
                <span><a href='https://buymeacoffee.com/royniladri'>
                    <img src={bmc} height="32" alt="Buy me a Coffee Logo"/> Buy me a Coffee</a>
                </span>
            </div>
        </div>
    )
}

export default Support;