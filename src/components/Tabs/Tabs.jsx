import React from 'react';
import Tab from './Tab';

const Tabs = ({ checkedTab, handleTabChange, offset, comicsOffset, seriesOffset }) => (
    <div className="switch-tabs-container">
        <Tab label="Characters" checkedTab={checkedTab === 'characters'} handleTabChange={() => handleTabChange('characters', offset)} />
        <Tab label="Comics" checkedTab={checkedTab === 'comics'} handleTabChange={() => handleTabChange('comics', comicsOffset)} />
        <Tab label="Series" checkedTab={checkedTab === 'series'} handleTabChange={() => handleTabChange('series', seriesOffset)} />
    </div>
)

export default Tabs;
