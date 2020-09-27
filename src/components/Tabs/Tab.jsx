import React from 'react';

const Tab = ({ label, checkedTab, handleTabChange }) => (
    <label className="blue"><input type="radio" name="toggle" checked={checkedTab} onChange={handleTabChange}></input><span>{label}</span></label>
)

export default Tab;
