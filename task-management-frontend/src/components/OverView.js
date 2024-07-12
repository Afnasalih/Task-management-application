import React from 'react';

const OverviewHeader = () => {
    return (
        <header className="overview-header">
            <h1>Overview</h1>
            <select name="year" id="year" className='date-filter'>
                <option value="30">Last 30 days</option>
                <option value="week">Last 1 week</option>
                <option value="months">Last 3 month</option>
                <option value="year">Last 1 year</option>
            </select>
        </header>
    );
};

export default OverviewHeader;
