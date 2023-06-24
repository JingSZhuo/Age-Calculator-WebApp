import { useState } from 'react';
import './App.scss';

function isLeapYear(year: number) {
  // Leap years are divisible by 4, except for years divisible by 100
  // However, years divisible by 400 are still considered leap years
  return (year % 4 === 0 && year % 100 !== 0) || (year % 400 === 0);
}

function App() {

  //DD-MM-YYYY
  const [date, setDate] = useState('--');
  const [month, setMonth] = useState('--');
  const [year, setYear] = useState('--');

  //Error Messages
  const [errorDate, setErrorDate] = useState('');
  const [errorMonth, setErrorMonth] = useState('');
  const [errorYear, setErrorYear] = useState('');
    
  const VerifyInput = (e: any): void => {
    e.preventDefault();

    //Max Dates in a month
    const datesInMonth: number[] = [0, 31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
     //new date object to get current day/month/year to calculate difference
    const currentDate = new Date();
    //fetching user input via getElementById
    const dateInput: HTMLInputElement | null = (document.getElementById('date') as HTMLInputElement);
    const monthInput: HTMLInputElement | null = document.getElementById('month') as HTMLInputElement;
    const yearInput: HTMLInputElement | null = document.getElementById('year') as HTMLInputElement;

    //Check leap year (February)
    if ( isLeapYear( parseInt(yearInput.value) ) === true ) {
      console.log(`${parseInt(yearInput.value)} is a leap year`);
      datesInMonth[2] = 29;
    }
    else { console.log("Not a leap year"); }

    //Check if values are blank
    if (dateInput.value === "" || monthInput.value === "" || yearInput.value === ""){
      console.log('Must fill in all blanks');
      setDate('--'); setMonth('--'); setYear('--'); 
      setErrorDate('This following fields are required')
      return;
    } 
    //Check if year is larger than current year
    if (parseInt(yearInput.value) > currentDate.getFullYear()){
      //console.log('Year is larger than current year, try again');
      setErrorDate(''); setErrorMonth(''); setErrorYear('Must be in the past');
      return;
    }
    //Check if month is between 0 and 12
    if (parseInt(monthInput.value) > 12 || parseInt(monthInput.value) < 1){
      //console.log('Month is not between 1 and 12, try again');
      setErrorDate(''); setErrorMonth('Must be a valid month'); setErrorYear('');
      return;
    }
    //Check if month is between 0 and 12
    if (parseInt(dateInput.value) > 31 || parseInt(dateInput.value) < 1){
      //console.log('Month is not between 1 and 12, try again');
      setErrorDate('Must be a valid day'); setErrorMonth(''); setErrorYear('');
      return;
    }
    //Check for appropriate date format i.e. 31/4 is not appropriate as there is 30 days in april
    if ( parseInt(dateInput.value) > datesInMonth[parseInt(monthInput.value)] ){
      //console.log('Date format not appropriate');
      setErrorDate('Must be a valid date'); setErrorMonth(''); setErrorYear('');
    }
    else{
      CalculateAge( parseInt(dateInput.value), parseInt(monthInput.value), parseInt(yearInput.value) );
      setErrorDate(''); setErrorMonth(''); setErrorYear('');
    }
  }

  const CalculateAge = (bdate: number, bmonth: number, byear: number): void => {

    const datesInMonth: number[] = [31, 30, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];

    const currentDate = new Date(); //new date object to get current day/month/year to calculate difference
    //console.log(bdate)
    const birthDate = new Date(byear, bmonth, bdate);

    let ageInYear: number = currentDate.getFullYear() - birthDate.getFullYear();
    let ageInMonth: number = (currentDate.getMonth()+1) - birthDate.getMonth();
    let ageInDate: number = currentDate.getDate() - birthDate.getDate();

    if (ageInMonth < 0){  //If the birth month is larger than current month
      ageInYear--;
      ageInMonth+=12;
    }
    if (ageInDate < 0){   //If the birth date is larger than current date
      ageInMonth--;
      ageInDate+= datesInMonth[bmonth+1]
    }

    setYear(`${ageInYear}`); setMonth(`${ageInMonth}`); setDate(`${ageInDate}`);
    console.log(`You are ${ageInDate} days, ${ageInMonth} months, and ${ageInYear} years old`)
  }

  return (
    <div className='main-container'>
      <div className='second-container'>
        <div className='inner-container'>
          <form className='container-input-output' onSubmit={VerifyInput}>
            <div className='date-input'>
              <div className='individual-date-input'>
                <label htmlFor='date'>DAY</label>
                <input type={'number'} id='date' placeholder='DD'/>
                <p className='error-message'>{errorDate}</p>
              </div>
              <div className='individual-date-input'>
                <label htmlFor='date'>MONTH</label>
                <input type={'number'} id='month' placeholder='MM'/>
                <p className='error-message'>{errorMonth}</p>
              </div>
              <div className='individual-date-input'>
                <label htmlFor='date'>YEAR</label>
                <input type={'number'} id='year' placeholder='YYYY'/>
                <p className='error-message'>{errorYear}</p>
              </div>
            </div>
            <div>
              <input type={'submit'} id='submit'/>
            </div>
          </form>
          <div className='output-container'>
            <div className='date-output-ymd-container'>
              <p className='state-ymd'>{year}</p>
              <p> years</p>
            </div>
            <div className='date-output-ymd-container'>
              <p className='state-ymd'>{month}</p>
              <p> months</p>
            </div>
            <div className='date-output-ymd-container'>
              <p className='state-ymd'>{date}</p>
              <p> days</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default App
