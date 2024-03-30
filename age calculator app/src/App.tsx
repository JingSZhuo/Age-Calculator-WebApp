import { useState } from 'react';
import './App.scss';

function App(){

  //DD-MM-YYYY
  const [date, setDate] = useState('--');
  const [month, setMonth] = useState('--');
  const [year, setYear] = useState('--');

  //Error Messages
  const [errorDate, setErrorDate] = useState('');
  const [errorMonth, setErrorMonth] = useState('');
  const [errorYear, setErrorYear] = useState('');

  //Error messages
  function VerifyYear(event: any): void {
    if((event.target.value) > new Date().getFullYear()) { 
      setErrorYear('Must be in the past')
    }
    else {(setErrorYear(''))}
  }
  function VerifyMonth(event: any): void{
    const m: number = event.target.value;
    if(!(m > 0 && m < 13)) { 
      setErrorMonth('Must be a valid month')
    }
    else {(setErrorMonth(''))}
  }
  function VerifyDay(event: any): void{
    const d: number = event.target.value;
    if(!(d > 0 && d < 32)){
      setErrorDate('Must be a valid day')
    }
    else {(setErrorDate(''))}
  }
    
  const VerifyInput = (e: any): void => {
    e.preventDefault();
    //fetching user input via getElementById
    const dateInput: HTMLInputElement | null = document.getElementById('date') as HTMLInputElement;
    const monthInput: HTMLInputElement | null = document.getElementById('month') as HTMLInputElement;
    const yearInput: HTMLInputElement | null = document.getElementById('year') as HTMLInputElement;
    //ParsedInt values
    const dateInputParsed: number = parseInt(dateInput.value);
    const monthInputParsed: number = parseInt(monthInput.value);
    const yearInputParsed: number = parseInt(yearInput.value);

    //new date object to get current day/month/year to calculate difference
    const currentDate = new Date();
    //User input pass through date object for date validation checks (month-1 because 11 is dec, 10 is nov etc...0 is jan)
    const dateCheck: Date = new Date(yearInputParsed, monthInputParsed-1, dateInputParsed);

    //Check if values are blank
    if ( (dateInput.value === "" || monthInput.value === "" || yearInput.value === "")) {
      setDate('--'); setMonth('--'); setYear('--'); 
      if (dateInput.value === ""){
        setErrorDate('This following fields are required');
      }// else { setErrorDate('')}
      if (monthInput.value === ""){
        setErrorMonth('This following fields are required');
      } //else { setErrorMonth('')}
      if (yearInput.value === ""){
        setErrorYear('This following fields are required');
      } //else { setErrorYear('')}
      return;
    }

    //Check if year is larger than current year
    else if (yearInputParsed > currentDate.getFullYear()){
      //setErrorDate(''); setErrorMonth(''); setErrorYear('Must be in the past');
      return;
    }
    //Check if month is between 0 and 12
    else if (monthInputParsed > 12 || monthInputParsed < 1){
      //setErrorDate(''); setErrorMonth('Must be a valid month'); setErrorYear('');
      return;
    }
    //Check if date is between 1 and 31
    else if (!(dateInputParsed < 32 && dateInputParsed > 0)){
      //setErrorDate('Must be a valid day'); setErrorMonth(''); setErrorYear('');
      return;
    }
    //Check for appropriate date format i.e. 31/4 is not appropriate as there is 30 days in april
    else if (dateInputParsed > dateCheck.getDate()) {
      setErrorDate('Must be a valid date');
    }
    else{
      CalculateAge( parseInt(dateInput.value), parseInt(monthInput.value), parseInt(yearInput.value) );
      setErrorDate(''); setErrorMonth(''); setErrorYear('');
    }
  }

  const CalculateAge = (bdate: number, bmonth: number, byear: number): void => {

    const currentDate = new Date(); //new date object to get current day/month/year
    const birthDate = new Date(byear, bmonth, bdate);

    //Difference in currentyear and birthyear is 0 or greater (i.e) byear same or smaller, bmonth same or smaller, bdate same or smaller --independent
    let ageInYear: number = currentDate.getFullYear() - birthDate.getFullYear();
    let ageInMonth: number = (currentDate.getMonth()+1) - birthDate.getMonth();
    let ageInDate: number = currentDate.getDate() - birthDate.getDate();

    //console.log(ageInYear, ageInMonth, ageInDate)

    //Special conditions
    if ((ageInDate < 0 && ageInMonth < 0)){   //if month and date is larger than current date
      ageInYear--;
      ageInMonth+=11;
      ageInDate += new Date(currentDate.getFullYear(), currentDate.getMonth(), 0).getDate(); //Gets the last day of the previous month
      console.log('date and month both larger')
    }
    else if ((ageInMonth === 0 && ageInDate < 0)){   //Month is the same and date is larger
      ageInYear--;
      ageInMonth+=11;
      ageInDate += new Date(currentDate.getFullYear(), currentDate.getMonth(), 0).getDate(); //Gets the last day of the previous month
      console.log('month same but date larger')
    }
    else if ((ageInDate === 0 && ageInMonth < 0)){  //Date is the same and month is larger
      ageInYear--;
      ageInMonth+=12;
      console.log('date same but month larger')
    }  
    else if ((ageInMonth > 0 && ageInDate < 0)){    //Date is larger and month is smaller
      ageInMonth--;
      ageInDate += new Date(currentDate.getFullYear(), currentDate.getMonth(), 0).getDate(); //Gets the last day of the previous month
      console.log('month smaller but date larger')
    }
    else if ((ageInMonth < 0 && ageInDate > 0)){    //Date is smaller and month is larger
      ageInYear--;
      ageInMonth+=12;
      console.log('month larger but date smaller')
    }
    setYear(`${ageInYear}`); setMonth(`${ageInMonth}`); setDate(`${ageInDate}`);
  }

  return (
    <div className='main-container'>
      <div className='second-container'>
        <div className='inner-container'>
          <form className='container-input-output' onSubmit={VerifyInput}>
            <div className='date-input'>
              <div className='individual-date-input'>
                <label htmlFor='date'>DAY</label>
                <input type={'number'} id='date' placeholder='DD' onChange={VerifyDay}/>
                <p className='error-message'>{errorDate}</p>
              </div>
              <div className='individual-date-input'>
                <label htmlFor='date'>MONTH</label>
                <input type={'number'} id='month' placeholder='MM' onChange={VerifyMonth}/>
                <p className='error-message'>{errorMonth}</p>
              </div>
              <div className='individual-date-input'>
                <label htmlFor='date'>YEAR</label>
                <input type={'number'} id='year' placeholder='YYYY' onChange={VerifyYear} />
                <p className='error-message'>{errorYear}</p>
              </div>
              <div className='submit-div'>
                <input type={'submit'} id='submit' value=''/>
              </div>
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
        <div style={{marginTop: '15px'}}>
          <p style={{fontSize: '10px', color: 'black'}}> Made by <a href='https://github.com/JingSZhuo' style={{fontSize: '10px', color: '#a850fb' , textDecoration: 'none'}}>Jing Zhuo</a></p>
        </div>
      </div>
    </div>
  )
}

export default App
