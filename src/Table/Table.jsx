import './Table.css';
import { useState } from 'react';
import { UniversityDetailsModal } from '../UniversityDetailsModal/UniversityDetailsModal';
import { buildFlagImageUrl } from '../utils/flag-utils';

const intlDate = new Intl.DateTimeFormat("en", { dateStyle: "long" });

export const Table = ({ data }) => {
  const [selectedUniversity, setSelectedUniversity] = useState(null);

  return (
    <>
      <UniversityDetailsModal university={selectedUniversity} onClose={() => setSelectedUniversity(null)} />

      <div id="root" role="table">
        <div class="table-container" id="table">
          <div class="header" role="rowgroup">
            <div class="header-col col-university" role="columnheader">
              educational institution
              <div class="header-col-arrow"></div>
            </div>
            <div class="header-col col-flag" role="columnheader">
              country
              <div class="header-col-arrow"></div>
            </div>
            <div class="header-col col-degrees" role="columnheader"s>
              degrees
              <div class="header-col-arrow"></div>
            </div>
          </div>

          {
            data.map(row => {
              const universityName = row['Educational institution'];
              const rowDate = row['Date of joining'];
              const countryCode = row['Country code'];
              const [day, month, year] = rowDate?.split(".");
              const dateOfJoin = new Date(year, month - 1, day);
              const degrees = row['Degrees'];

              return (
                <div class="row" role="row" onClick={() => setSelectedUniversity(row)} key={universityName}>
                  <div class="col col-university" role="cell">
                    <div class="col-text">{universityName}</div>
                    <div class="university-date">joined: {intlDate.format(dateOfJoin)}</div>
                  </div>

                  <div class="col-flag" role="cell">
                    <div class="flag" style={{ backgroundImage: buildFlagImageUrl(countryCode) }}></div>
                  </div>

                  <div class="col-text col-degrees" role="cell">{degrees}</div>
                </div>
              );
            })
          }
        </div>
      </div>
    </>
  );
}
