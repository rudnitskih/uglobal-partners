import './Table.scss';
import {useState} from 'react';
import ReactSelect, {components} from 'react-select';
import {UniversityDetailsModal} from '../UniversityDetailsModal/UniversityDetailsModal';
import {buildFlagImageUrl} from '../utils/flag-utils';
import {getDateOfJoin} from '../utils/table-data-utils';

const OPTION_ALL = {label: 'All', value: null};
const intlDate = new Intl.DateTimeFormat("en", {dateStyle: "long"});

const Control = ({children, ...props}) => (
  <components.Control {...props} className="select-control">
    {children}
  </components.Control>
);

const uniq = (arr) => Array.from(new Set(arr));

export const Table = ({ data }) => {
  const [countryFilter, setCountryFilter] = useState(null);
  const [degreeFilter, setDegreeFilter] = useState(null);
  const [selectedUniversity, setSelectedUniversity] = useState(null);

  const countryList = uniq(data.map((university) => university?.['Country']))
    .map(country => ({value: country, label: country}));
  const degreesList = uniq(data.flatMap((university) => university?.['Degrees'].split(', ')))
    .map(degree => ({value: degree, label: degree}));

  const filteredData = data.filter((row) => {
    if (countryFilter && row?.['Country'] !== countryFilter) {
      return false;
    }

    if (degreeFilter && !row?.['Degrees']?.includes(degreeFilter)) {
      return false;
    }

    return true;
  });

  return (
    <>
      <UniversityDetailsModal university={selectedUniversity} onClose={() => setSelectedUniversity(null)} />

      <div className="table-container">
        <div className="header" role="rowgroup">
          <div className="header-col col-university"
               role="columnheader">
            Educational Institution
          </div>
          <div className="header-col col-flag" role="columnheader">
            <ReactSelect
              className="react-select-container"
              classNamePrefix="react-select"
              placeholder="Country"
              options={[OPTION_ALL, ...countryList]}
              onChange={({value}) => setCountryFilter(value)}
              components={{
                Control,
                IndicatorsContainer: () => <div className="header-col-arrow"></div>
              }}
            />
          </div>
          <div className="header-col col-degrees" role="columnheader">
            <ReactSelect
              className="react-select-container"
              classNamePrefix="react-select"
              placeholder="Degrees"
              options={[OPTION_ALL, ...degreesList]}
              onChange={({value}) => setDegreeFilter(value)}
              components={{
                Control,
                IndicatorsContainer: () => <div className="header-col-arrow"></div>
              }}
            />
          </div>
        </div>

        {
          filteredData.map(row => {
            const universityName = row['Educational institution'];
            const countryCode = row['Country code'];
            const dateOfJoin = getDateOfJoin(row);
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
    </>
  );
}
