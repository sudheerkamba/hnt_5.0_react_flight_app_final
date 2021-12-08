import React,{ useState } from "react";
import AdminLogin from "../Admin/AdminLogin";
import './HomeForm.css'
const HomeForm=()=>{
    const [fromPlace, setFromPlace] = useState('');
    const [toPlace, setToPlace] = useState('');
    const [enteredDate, setEnteredDate] = useState('');
    // const [userInput, setUserInput] = useState({
    //   enteredTitle: '',
    //   enteredAmount: '',
    //   enteredDate: '',
    // });
  
    const fromPlaceChangeHandler = (event) => {
        setFromPlace(event.target.value);
      // setUserInput({
      //   ...userInput,
      //   enteredTitle: event.target.value,
      // });
      // setUserInput((prevState) => {
      //   return { ...prevState, enteredTitle: event.target.value };
      // });
    };
  
    const toPlaceChangeHandler = (event) => {
      setToPlace(event.target.value);
      // setUserInput({
      //   ...userInput,
      //   enteredAmount: event.target.value,
      // });
    };
  
    const dateChangeHandler = (event) => {
      setEnteredDate(event.target.value);
      // setUserInput({
      //   ...userInput,
      //   enteredDate: event.target.value,
      // });
    };
  
    const submitHandler = (event) => {
      event.preventDefault();
  
      let expenseData = {
        from: fromPlace,
        to: toPlace,
        date: new Date(enteredDate),
      };
  
      console.log(expenseData);
     setToPlace('');
     setFromPlace('');
     setEnteredDate('');
  
     expenseData=null;
     console.log(expenseData);
    };
return(
    <div>
<form onSubmit={submitHandler}>
      <div className='new-expense__controls'>
        <div className='new-expense__control'>
          <label>From</label>
          <input
            type='text'
            value={fromPlace}
            onChange={fromPlaceChangeHandler}
          />
        </div>
        <div className='new-expense__control'>
          <label>To</label>
          <input
            type='text'
            value={toPlace}
            onChange={toPlaceChangeHandler}
          />
        </div>
        
        <div className='new-expense__control'>
          <label>Date</label>
          <input
            type='date'
            min='2019-01-01'
            max='2022-12-31'
            value={enteredDate}
            onChange={dateChangeHandler}
          />
        </div>
      </div>
      <div className='new-expense__actions'>
        <button type='submit'>search</button>
      </div>
    </form>
    
    
    </div>
);
};

export default HomeForm;