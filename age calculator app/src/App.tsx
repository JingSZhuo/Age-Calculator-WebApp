import React, { useState } from 'react';
import './App.scss';

function App() {

    
  const CheckDateRange = (event: React.ChangeEvent<HTMLInputElement>): boolean => {
    const parsedValueFloat: number = parseFloat(event.target.value);
    const parsedValueInteger: number = parseInt(event.target.value);

    if (!Number.isInteger( parsedValueFloat) || parsedValueFloat !== parsedValueInteger ){
      console.log('Not a whole number');
      return false;
    }
    if (!((parsedValueInteger > 0) && (parsedValueFloat < 32))) {
      console.log('out of bounds');
      return false;
    }
    return true;
  }

  const CalculateAge = (): void => {

    //user input 
    const dateInput: HTMLInputElement | null = document.getElementById('date') as HTMLInputElement;
    const monthInput: HTMLInputElement | null = document.getElementById('month') as HTMLInputElement;
    const yearInput: HTMLInputElement | null = document.getElementById('year') as HTMLInputElement;
  
    const dateObject = new Date(); //new date object to get current day/month/year to calculate difference

    const yearDifference = dateObject.getFullYear() - parseInt(yearInput.value);

    if ( dateObject.getMonth() > parseInt(monthInput.value)){
      const monthDifference = dateObject.getMonth() - parseInt(monthInput.value);
      console.log(dateObject.getMonth() , monthInput.value )
      console.log('Month: ', monthDifference);
    } else {
      const newYearDifference = yearDifference-1;
      const monthDifference = 12 + dateObject.getMonth() - parseInt(monthInput.value);
      console.log(dateObject.getMonth() , monthInput.value )
      console.log('Month: ', monthDifference, newYearDifference);
    }
    
  }

  return (
    <div className='main-container'>
      <div className='second-container'>
        <div className='inner-container'>
          <div className='container-input-output'>
            <div className='date-input'>
              <div className='individual-date-input'>
                <label htmlFor='date'>DAY</label>
                <input type={'number'} id='date' placeholder='DD' onChange={CheckDateRange}/>
              </div>
              <div className='individual-date-input'>
                <label htmlFor='date'>MONTH</label>
                <input type={'number'} id='month' placeholder='MM'/>
              </div>
              <div className='individual-date-input'>
                <label htmlFor='date'>YEAR</label>
                <input type={'number'} id='year' placeholder='YYYY'/>
              </div>
            </div>
            <div>
              <input type={'submit'} id='submit' onClick={CalculateAge}/>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default App
