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

export function getDates(type,xtype) {
  let fromDate = moment().startOf(type);
  let toDate = moment().endOf(type);
  let diff = toDate.diff(fromDate, xtype);
  let dates = [];
  for (let i = 0; i <= diff; i++) {
    dates.push(moment(fromDate).add(i, xtype));
  }
  return dates;
}

export function getData(type,xtype,dateFormat,transactions) {
  const dates = getDates(type,xtype);

  let totalIncome = 0;
  let totalExpense = 0;
  const incomePerDate = [];
  const expensePerDate = [];
  const incomePerCatogories = {};
  const expensePerCatogories = {};
  const incomeBackgroundColor=[];
  const expenseBackgroundColor=[];
  
  for (let d of dates) {
    let ita = 0;
    let eta = 0;
    for (let t of transactions) {

      if (t.type === "Income" && moment(t.date).format(dateFormat) === moment(d).format(dateFormat)) {
        ita += t.amount;
        totalIncome += t.amount;
        if (!incomePerCatogories[t.category]) {
          incomePerCatogories[t.category] = t.amount;
        } else {
          let newAmount = incomePerCatogories[t.category] + t.amount;
          incomePerCatogories[t.category] = newAmount;
        }
      }
      if (t.type === "Expense" && moment(t.date).format(dateFormat) === moment(d).format(dateFormat)) {
        eta += t.amount;
        totalExpense += t.amount;
        if (!expensePerCatogories[t.category]) {
          expensePerCatogories[t.category] = t.amount;
        } else {
          let newAmount = expensePerCatogories[t.category] + t.amount;
          expensePerCatogories[t.category] = newAmount;
        }
      }
    }
    incomePerDate.push(ita);
    incomeBackgroundColor.push("rgba(82, 196, 26, 0.5)");
    expensePerDate.push(eta);
    expenseBackgroundColor.push("rgba(224, 87, 87, 0.7)");

  }

  const formatDates=[];
  dates.map(d => {
    formatDates.push(d.format(dateFormat));
    return d;
  })

  const data = {
    dates:formatDates,
    incomeData: incomePerDate,
    expenseData: expensePerDate,
    incomeBackgroundColor,
    expenseBackgroundColor,
    totalIncome,
    totalExpense,
    incomePerCatogories,
    expensePerCatogories
    
  };
  return data;
}
