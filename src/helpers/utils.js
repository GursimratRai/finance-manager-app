import moment from "moment";

export function getFormBody(params) {
  let formBody = [];
  for (let property in params) {
    let encodedKey = encodeURIComponent(property);
    let encodedValue = encodeURIComponent(params[property]);

    formBody.push(encodedKey + "=" + encodedValue);
  }
  return formBody.join("&");
}

export function getAuthTokenFromLocalStorage() {
  return localStorage.getItem("token");
}

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

export function getData(type, subType, navigator, dateFormat, transactions) {
  let dates = getDates(type, subType, navigator, dateFormat);
  let totalIncome = 0;
  let totalExpense = 0;

  const BarData = [];
  const IncomePieData = [];
  const ExpensePieData = [];
  const incomePerCatogories = {};
  const expensePerCatogories = {};

  for (let date of dates) {
    let ita = 0;
    let eta = 0;
    for (let transaction of transactions) {
      if (
        transaction.type === "Income" &&
        moment(transaction.date).format(dateFormat) === date
      ) {
        ita += transaction.amount;
        totalIncome += transaction.amount;
        if (!incomePerCatogories[transaction.category]) {
          incomePerCatogories[transaction.category] = transaction.amount;
        } else {
          let newAmount =
            incomePerCatogories[transaction.category] + transaction.amount;
          incomePerCatogories[transaction.category] = newAmount;
        }
      }
      if (
        transaction.type === "Expense" &&
        moment(transaction.date).format(dateFormat) === date
      ) {
        eta += transaction.amount;
        totalExpense += transaction.amount;
        if (!expensePerCatogories[transaction.category]) {
          expensePerCatogories[transaction.category] = transaction.amount;
        } else {
          let newAmount =
            expensePerCatogories[transaction.category] + transaction.amount;
          expensePerCatogories[transaction.category] = newAmount;
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
