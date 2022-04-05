import React from 'react';
import { useState } from 'react';
import './StatsBar.scss';
import CountUp from "react-countup";

export const StatsBar = ({data}) => {
  const [isTooltipVisible, setIsTooltipVisible] = useState(false);
  const joinedUniversities = data ? data.length : 31;
  const opportunitiesLength = data ? data.reduce((acc, univesity) => {
    const scholarships = Number(univesity['Students Scholarships']);
    const positions = Number(univesity['Academic Positions/Appointments']);

    return acc + scholarships + positions;
  }, 0) : 630;

  return (
    <div className="stats-bar">
      <div className="stats-item stats-item-1" >
        <CountUp className="stats-num" end={joinedUniversities} duration={1} preserveValue={true}/>
        <div className="stats-description">Joined Educational Institutions</div>
      </div>

      <div
        className="stats-item stats-item-2"
        onMouseEnter={() => setIsTooltipVisible(true)}
        onMouseLeave={() => setIsTooltipVisible(false)}
      >
        <div className="stats-num">
          <CountUp end={opportunitiesLength} duration={2} preserveValue={true}/>
          +
        </div>
        <div className="stats-description">
          Opportunities created by partners
        </div>

        {/*<div className={`stats-item-2-popup ${isTooltipVisible ? '' : 'hidden'}`}>*/}
        {/*  Much more in reality. Not every Institution makes it public*/}
        {/*</div>*/}
      </div>
    </div>
  );
}
