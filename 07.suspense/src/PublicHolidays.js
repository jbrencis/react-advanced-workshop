import React from 'react'
import lodash from 'lodash'
import moment from 'moment'

const publicHolidays = {
  country: 'Latvia',
  values: [
    [
      "January 01",
      "New Year's Day"
    ],
    [
      "April 19",
      "Good Friday"
    ],
    [
      "April 22",
      "Easter Monday"
    ],
    [
      "May 01",
      "Labour Day"
    ],
    [
      "May 06",
      "Declaration of Independence Day Holiday"
    ],
    [
      "May 12",
      "Mother's Day"
    ],
    [
      "June 23",
      "Midsummer Eve"
    ],
    [
      "June 24",
      "St. John's Day"
    ],
    [
      "September 08",
      "Father's Day"
    ],
    [
      "November 18",
      "Latvian National Day"
    ],
    [
      "December 25",
      "Christmas Day"
    ],
    [
      "December 26",
      "Second day of Christmas"
    ],
    [
      "December 31",
      "New Year's Eve"
    ]
  ],
}

const PublicHolidays = () => {
  const holidays = lodash.get(publicHolidays, 'values')
  return (
    <>
      {holidays.map((holiday, idx) => (
        <div key={`holiday-${idx}`} className="row">
          <div>{moment(new Date(holiday[0]).setYear(2019)).format('YYYY-MM-DD')}</div>
          <div>{holiday[1]}</div>
        </div>
      ))}
    </>
  )
}

export default PublicHolidays