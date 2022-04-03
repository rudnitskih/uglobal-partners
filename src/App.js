import React, { useState } from 'react';
import Papa from 'papaparse';
import './App.css';
import { Table } from './Table/Table';

const UNIVERSITY_DATA_SPREADSHEET_ID = '2PACX-1vS522HjPvcO9ZaxZ1ywosGMa9ggE0m0qe7-cdhc-Ok3A1pOHDmyBy1zzIlxZ0YZJQqxqWc7zGm5uIEc';

function App() {
  const [universityData, setUniversityData] = useState();

  const fetchInitialData = async () => {
    const data = await loadSpreadsheet(UNIVERSITY_DATA_SPREADSHEET_ID);

    setUniversityData(data);
  };
  
  React.useEffect(() => {
    fetchInitialData();
  }, []);
  
  console.log(universityData);
  
  return (
    <div className="App">
      {universityData && <Table data={universityData} />}
    </div>
  );
}

export default App;

// 
export const loadSpreadsheet = (spreadsheetID) => {
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