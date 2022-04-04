import { useState } from 'react';
import './StatsBar.scss';

export const StatsBar = ({data}) => {
  const [isTooltipVisible, setIsTooltipVisible] = useState(false);
  const joinedUniversities = data ? data.length : '00';
  const opportunitiesLength = data ? data.reduce((acc, univesity) => {
    const scholarships = Number(univesity['Students Scholarships']);
    const positions = Number(univesity['Academic Positions/Appointments']);

    return acc + scholarships + positions;
  }, 0) : '000';

  return (
    <div className="stats-bar">
      <div className="stats-item stats-item-1" >
        <div className="stats-num">
          {joinedUniversities}
        </div>
        <div className="stats-description">Joined Educational Institutions</div>
      </div>

      <div
        className="stats-item stats-item-2"
        onMouseEnter={() => setIsTooltipVisible(true)}
        onMouseLeave={() => setIsTooltipVisible(false)}
      >
        <div className="stats-num">
          {`${opportunitiesLength}+`}
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
