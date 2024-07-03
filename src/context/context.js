import React,{useReducer,useEffect,createContext} from "react";

import contextReducer from './contextReducer'


const initialState=JSON.parse(localStorage.getItem('transactions')) || [];

export const ExpenseTrackerContext=createContext(initialState);

export const Provider=({children})=>{
    const [transactions,dispatch]=useReducer(contextReducer,initialState);

    useEffect(() => {
        localStorage.setItem('transactions', JSON.stringify(transactions));
      }, [transactions]);

    const deleteTransaction=(id)=>{
        dispatch({ type: 'DELETE_TRANSACTION', payload: id})
    }
     
    const addTransaction=(transaction)=>dispatch({type:'ADD_TRANSACTION',payload: transaction})

    const balance = transactions.reduce((acc, currVal) => {
    return currVal.type === 'Expenses' ? acc - currVal.amount : acc + currVal.amount;
  }, 0);

    return (
        <ExpenseTrackerContext.Provider value={{
            deleteTransaction,
            addTransaction,
            transactions,
            balance,
        }}>
            {children}
        </ExpenseTrackerContext.Provider>
    )
}