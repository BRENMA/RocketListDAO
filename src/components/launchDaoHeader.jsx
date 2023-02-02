import React from 'react'
import './banner.css';

const LaunchDaoHeader = () => {
    return (
        <div className="banner">
            <div className="component1">
                <h1>step 1:</h1>
                <p>fundraising details</p>
            </div>
            <div className="component2">
                <h1>step 2:</h1>
                <p>memo</p>
            </div>
            <div className="component3">
                <h1>step 3:</h1>
                <p>create token</p>
            </div>
            <div className="component4">
                <h1>step 4:</h1>
                <p>deploy vote contract</p>
            </div>
            <div className="component5">
                <h1>step 5:</h1>
                <p>finalize</p>
            </div>
        </div>
    )
}

export default LaunchDaoHeader