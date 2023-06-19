import React, { useState } from 'react';
import './App.scss';

function App() {

    
  const CheckDateRange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const parsedValueFloat: number = parseFloat(event.target.value);
    const parsedValueInteger: number = parseInt(event.target.value);

    if (!Number.isInteger( parsedValueFloat) || parsedValueFloat !== parsedValueInteger ){
      console.log('Not a whole number')
    }
    if (!((parsedValueInteger > 0) && (parsedValueFloat < 32))) {
      console.log('out of bounds')
    }
  }

  const ThrowError = () => {

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
                <input type={'number'} id='date' placeholder='MM'/>
              </div>
              <div className='individual-date-input'>
                <label htmlFor='date'>YEAR</label>
                <input type={'number'} id='date' placeholder='YYYY'/>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default App
