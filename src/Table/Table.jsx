import './Table.css';
import { useState } from 'react';
import ReactSelect, {components} from 'react-select';
import { UniversityDetailsModal } from '../UniversityDetailsModal/UniversityDetailsModal';
import { buildFlagImageUrl } from '../utils/flag-utils';

const intlDate = new Intl.DateTimeFormat("en", { dateStyle: "long" });

const Control = ({ children, ...props }) => (
  <components.Control {...props} className="select-control">
    {children}
  </components.Control>
);

const uniq = (arr) => Array.from(new Set(arr));

export const Table = ({ data }) => {
  const [countryFilter, setCountryFilter] = useState(null);
  const [selectedUniversity, setSelectedUniversity] = useState(null);
  const countryList = uniq(data.map((university) => university?.['Country']))
    .map(country => ({value: country, label: country}));

  const filteredData = data.filter((row) => {
    if (countryFilter) {
      return row?.['Country'] === countryFilter;
    }

    return true;
  });
    
  return (
    <>
      <UniversityDetailsModal university={selectedUniversity} onClose={() => setSelectedUniversity(null)} />

      <div id="root" role="table">
        <div className="table-container" id="table">
          <div className="header" role="rowgroup">
            <div className="header-col col-university" role="columnheader">
              educational institution
              <div className="header-col-arrow"></div>
            </div>
            <div className="header-col col-flag" role="columnheader">
              
              <ReactSelect 
                placeholder="country"
                options={countryList}
                onChange={({value}) => setCountryFilter(value)}
                components={{
                  Control,
                  IndicatorsContainer: () => <div className="header-col-arrow"></div>
                }}
              />
            </div>
            <div className="header-col col-degrees" role="columnheader" s>
              degrees
              <div className="header-col-arrow"></div>
            </div>
          </div>

          {
            filteredData.map(row => {
              const universityName = row['Educational institution'];
              const rowDate = row['Date of joining'];
              const countryCode = row['Country code'];
              const [day, month, year] = rowDate?.split('.');
              const dateOfJoin = new Date(year, month - 1, day);
              const degrees = row['Degrees'];

              return (
                <div className="row" role="row" onClick={() => setSelectedUniversity(row)} key={universityName}>
                  <div className="col col-university" role="cell">
                    <div className="col-text">{universityName}</div>
                    <div className="university-date">joined: {intlDate.format(dateOfJoin)}</div>
                  </div>

                  <div className="col col-flag" role="cell">
                    <div className="flag" style={{ backgroundImage: buildFlagImageUrl(countryCode) }}></div>
                  </div>

                  <div className="col col-text col-degrees" role="cell">{degrees}</div>
                </div>
              );
            })
          }
        </div>
      </div>
    </>
  );
}
