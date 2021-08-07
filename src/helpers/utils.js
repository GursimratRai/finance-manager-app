import moment from "moment";
import { useState } from "react";

//function used for encoding the form data
export function getFormBody(params) {
  let formBody = [];
  for (let property in params) {
    let encodedKey = encodeURIComponent(property);
    let encodedValue = encodeURIComponent(params[property]);

    formBody.push(encodedKey + "=" + encodedValue);
  }
  return formBody.join("&");
}

//Function for getting the authentication token from the local storage
export function getAuthTokenFromLocalStorage() {
  return localStorage.getItem("token");
}

//Custom React Hook for handling form input and changes
export function useFormInput(initialValue) {
  const [value, setValue] = useState(initialValue);

  function handleChange(e) {
    setValue(e.target.value);
  }

  return {
    value,
    onChange: handleChange,
  };
}

//function for generating dates in a desired format
export function getDates(type, subType, navigator, dateFormat) {
  let fromDate = moment().startOf(type).add(navigator, type);
  let toDate = moment().endOf(type).add(navigator, type);
  let diff = toDate.diff(fromDate, subType);
  let dates = [];
  for (let i = 0; i <= diff; i++) {
    dates.push(moment(fromDate).add(i, subType).format(dateFormat));
  }
  return dates;
}

//function for calculating different charts data
export function getData(type, subType, navigator, dateFormat, transactions) {
  let dates = getDates(type, subType, navigator, dateFormat);
  //Statistics
  let totalIncome = 0;
  let totalExpense = 0;
  //Bar chart data
  const BarData = [];
  //Doughnut chart data
  const IncomePieData = [];
  const ExpensePieData = [];
  const incomePerCatogories = {};
  const expensePerCatogories = {};

  for (let date of dates) {

    let ita = 0;
    let eta = 0;
    
    for (let transaction of transactions) {
    
      let type = transaction.type;
      let category = transaction.category;
      let amount = transaction.amount;
      let transactionDate = moment(transaction.date).format(dateFormat);
    
      if (type === "Income" && transactionDate === date) {
    
        ita += transaction.amount;
        totalIncome += transaction.amount;
    
        if (!incomePerCatogories[category]) {
          incomePerCatogories[category] = amount;
        } else {
          incomePerCatogories[category] = incomePerCatogories[category] + amount;
        }
      }
      if (type === "Expense" && transactionDate === date) {
        eta += amount;
        totalExpense += amount;
        if (!expensePerCatogories[category]) {
          expensePerCatogories[category] = amount;
        } else {
          expensePerCatogories[category] = expensePerCatogories[category] + amount;
        }
      }
    }
    BarData.push(
      { name: "Income", x: date, y: ita },
      { name: "Expense", x: date, y: eta }
    );
  }

  for (let category of Object.keys(incomePerCatogories)) {
    IncomePieData.push({
      type: category,
      value: incomePerCatogories[category],
    });
  }
  for (let category of Object.keys(expensePerCatogories)) {
    ExpensePieData.push({
      type: category,
      value: expensePerCatogories[category],
    });
  }

  const data = {
    BarData,
    dates,
    totalIncome,
    totalExpense,
    IncomePieData,
    ExpensePieData,
  };

  return data;
}
