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

export function getDates() {
  let fromDate = moment().startOf("month");
  let toDate = moment().endOf("month");
  let diff = toDate.diff(fromDate, "days");
  let dates = [];
  for (let i = 0; i < diff; i++) {
    dates.push(moment(fromDate).add(i, "days").format("MMM Do,YY"));
  }
  return dates;
}

export function getData(transactions) {
  const dates = getDates();
  const incomeAmounts = [];
  const expenseAmounts = [];
  for (let d of dates) {
    let ita = 0;
    let eta = 0;
    for (let t of transactions) {
      if (t.type === "Income" && moment(t.date).format("MMM Do,YY") === d) {
        ita += t.amount;
      }
      if (t.type === "Expense" && moment(t.date).format("MMM Do,YY") === d) {
        eta += t.amount;
      }
    }
    incomeAmounts.push(ita);
    expenseAmounts.push(eta);
  }

  const data = {
    dates: dates,
    incomeData: incomeAmounts,
    expenseData: expenseAmounts,
  };
  return data;
}
