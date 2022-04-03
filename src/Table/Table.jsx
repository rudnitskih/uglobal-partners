import './Table.css';

const intlDate = new Intl.DateTimeFormat("en", { dateStyle: "long" });
const buildFlagImageUrl = (countryCode) => `url("https://npmcdn.com/flag-icons@6.1.1/flags/4x3/${countryCode?.toLowerCase()}.svg")`;

export const Table = ({data}) => {
  return  (
      <div id="root" role="table">
        <div class="table-container" id="table">
          <div class="header" role="rowgroup">
            <div class="header-col col-university">
              educational institution
              <div class="header-col-arrow"></div>
              </div>
            <div class="header-col col-flag">
              country
              <div class="header-col-arrow"></div>
            </div>
            <div class="header-col col-degrees">
              degrees
              <div class="header-col-arrow"></div>
            </div>
          </div>

          {
            data.map(row => {
              const university = row['Educational institution'];
              const rowDate = row['Date of joining'];
              const countryCode = row['Country code'];
              const [day, month, year] = rowDate?.split(".");
              const dateOfJoin = new Date(year, month - 1, day);
              const degrees = row['Degrees'];

              
              return (
                <div class="row">
                  <div class="col col-university">
                    <div class="col-text">{university}</div>
                    <div class="university-date">joined: {intlDate.format(dateOfJoin)}</div>
                  </div>

                  <div class="col-flag">
                    <div class="flag" style={{backgroundImage: buildFlagImageUrl(countryCode)}}></div>
                  </div>

                  <div class="col-text col-degrees">{degrees}</div>
                </div>
              );
            })
          }
        </div>
      </div>
  );
}
