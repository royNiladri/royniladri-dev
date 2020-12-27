import React from 'react';
import './Footer.scss';

import bmc from '../../assets/images/bmc-logo.svg';
import patreon from '../../assets/images/Patreon_logomark.svg';

function Support() {
    return (
        <div className="support">
            <div className="support-links">
                <span><a href='https://www.patreon.com/royniladri'>
                    <img src={patreon} height="32" alt="Patreon Logo"/>
                </a> Become a Patreon</span>     
                <span><a href='https://buymeacoffee.com/royniladri'>
                    <img src={bmc} height="32" alt="Buy me a Coffee Logo"/>
                </a>Buy me a Coffee</span>
            </div>
        </div>
    )
}

export default Support;