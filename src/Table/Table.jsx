import './Table.scss';
import {useState} from 'react';
import ReactSelect, {components} from 'react-select';
import {UniversityDetailsModal} from '../UniversityDetailsModal/UniversityDetailsModal';
import {buildFlagImageUrl} from '../utils/flag-utils';
import {getDateOfJoin} from '../utils/table-data-utils';
import {APP_MODE} from "../constants";

const OPTION_ALL_COUNTRIES = {label: 'All Countries', value: null};
const OPTION_ALL_DEGREES = {label: 'All Degrees', value: null};

const intlDate = new Intl.DateTimeFormat("en", {dateStyle: "long"});

const Control = ({children, ...props}) => (
  <components.Control {...props} className="select-control">
    {children}
  </components.Control>
);

const uniq = (arr) => Array.from(new Set(arr));

export const Table = ({ data, mode }) => {
  const [countryFilter, setCountryFilter] = useState(null);
  const [degreeFilter, setDegreeFilter] = useState(null);
  const [selectedUniversity, setSelectedUniversity] = useState(null);

  const countryList = uniq(data.map((university) => university?.['Country']))
    .map(country => ({value: country, label: country}));
  const degreesList = uniq(data.flatMap((university) => university?.['Degrees'].split(', ')))
    .map(degree => ({value: degree, label: degree}));

  const filteredData = data.map((row) => {
    let visible = true;

    if (countryFilter && row?.['Country'] !== countryFilter) {
      visible = false;
    }

    if (degreeFilter && !row?.['Degrees']?.includes(degreeFilter)) {
      visible = false;
    }

    return {
      ...row,
      visible,
    };
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
              options={[OPTION_ALL_COUNTRIES, ...countryList]}
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
              options={[OPTION_ALL_DEGREES, ...degreesList]}
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
            const visible = row.visible;
            const universityName = row['Educational institution'];
            const countryCode = row['Country code'];
            const logoUrl = row['Logo'];
            const dateOfJoin = getDateOfJoin(row);
            const degrees = row['Degrees'];
            const linkToApply = mode === APP_MODE.WIDGET && row['Link to apply'];

            return (
              <div className={`row ${visible ? '' : 'isHiddenRow'}`} role="row" onClick={() =>
                setSelectedUniversity(row)} key={universityName}>
                <div className="col col-text col-logo" role="cell">
                  {
                    logoUrl && (
                      <img className="table-logo" src={logoUrl} alt="" />
                    )
                  }
                </div>

                <div className="col col-university" role="cell">
                  <div className="col-text">{universityName}</div>
                  <div className="university-date">joined: {intlDate.format(dateOfJoin)}</div>
                  {linkToApply && (
                    <a href={linkToApply} title="Link To Apply" className="apply-link">Link To Apply</a>
                  )}
                </div>

                <div className="col col-text col-flag" role="cell">
                  <div className="flag" style={{backgroundImage: buildFlagImageUrl(countryCode)}}/>
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
