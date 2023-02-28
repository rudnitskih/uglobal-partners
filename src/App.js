import React, {useState} from 'react';
import Papa from 'papaparse';
import './App.scss';
import {Table} from './Table/Table';
import {StatsBar} from './StatsBar/StatsBar';
import {getDateOfJoin} from './utils/table-data-utils';
import {Header} from "./Header";
import classNames from "classnames";

const UNIVERSITY_DATA_SPREADSHEET_ID = '2PACX-1vS522HjPvcO9ZaxZ1ywosGMa9ggE0m0qe7-cdhc-Ok3A1pOHDmyBy1zzIlxZ0YZJQqxqWc7zGm5uIEc';

export const APP_MODE = {
  PAGE: 'PAGE',
  WIDGET: 'WIDGET',
}

function App({mode}) {
  const [universityData, setUniversityData] = useState();

  const fetchInitialData = async () => {
    const data = await loadSpreadsheet(UNIVERSITY_DATA_SPREADSHEET_ID);

    setUniversityData(data
      .map(row => {
        const logoDriveId = typeof row['Logo'] === 'string' && row['Logo'].match(/\/d\/(.*)\//)?.[1];

        return {
          ...row,
          Logo: logoDriveId ? `https://drive.google.com/uc?id=${logoDriveId}` : undefined,
        };
      })
      .sort((a, b) => getDateOfJoin(b) - getDateOfJoin(a)));
  };

  React.useEffect(() => {
    fetchInitialData();
  }, []);

  return (
    <>
      {mode === APP_MODE.PAGE && (
        <Header />
      )}
      <div className={classNames("content", {
        'content_page': mode === APP_MODE.PAGE,
      })}>
        <StatsBar data={universityData} />
        {universityData && <Table data={universityData} />}
      </div>
    </>
  );
}

export default App;

const loadSpreadsheet = (spreadsheetID) => {
  return new Promise((resolve, reject) => {
    Papa.parse(`https://docs.google.com/spreadsheets/d/e/${spreadsheetID}/pub?output=csv`, {
      download: true,
      header: true,
      complete: (results) => {
        resolve(results.data);
      },
      error: (error) => {
        reject(error);
      }
    });
  });
};
