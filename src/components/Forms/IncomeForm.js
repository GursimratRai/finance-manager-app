import React, { useState } from "react";
import { connect, useDispatch } from "react-redux";

//Use MomentJs for date and time
import moment from "moment";

//Action for creating new transaction 
import { createTransaction } from "../../actions/transaction";

//Custom React Hook for inputing form data and handling the change
import {useFormInput} from '../../helpers/utils';

//Use ant design component
import { DatePicker, Select } from "antd";
const { Option } = Select;

//Form for getting income / earning related data
const IncomeForm = (props) => {
  const source = useFormInput("");
  const amount = useFormInput("");
  const description = useFormInput("");
  const [date, setDate] = useState(props.date);
  const [category, setCategory] = useState("salary");
  const { onCancel, onSubmit } = props;
  const { inProgress } = props.transaction;

  const dateFormat = "DD/MM/YYYY";
  const dispatch = useDispatch();

  //function for handling the submission of the form
  const handleFormSubmit = (e) => {
    e.preventDefault();

    if (source && amount && date && category) {
      dispatch(
        createTransaction({
          type:'Income',
          source: source.value,
          amount: amount.value,
          description: description.value,
          date: date,
          category: category,
        })
      );
      onSubmit();
    }
  };

  //function for handling change in category in the form
  function handleCategoryChange(value) {
    setCategory(value);
  }
  //funciton for handling change in date in the form
  function handleDateChange(value) {
    setDate(moment(value));
  }

  return (
    <div>
      <form className="modal-form" onSubmit={handleFormSubmit}>
        <div className="modal-form-field">
          <h3>Amount:</h3>
          <input
            type="Number"
            min="0"
            placeholder="Enter Amount"
            required
            value={amount.value} onChange={amount.onChange} 
          />
        </div>
        <div className="modal-form-field">
          <h3>Source:</h3>
          <input type="text" placeholder="Enter Source" required value={source.value} onChange={source.onChange}  />
        </div>

        <div className="modal-form-field">
          <h3>Category:</h3>
          <Select
            defaultValue="salary"
            style={{ width: 120 }}
            onChange={handleCategoryChange}
          >
            <Option value="salary">Salary</Option>
            <Option value="equities">Equities</Option>
            <Option value="personal savings">Personal Savings</Option>
            <Option value="investment">Investment</Option>
            <Option value="pensions">Pension</Option>
            <Option value="account transfer">Account Transfer</Option>
            <Option value="bonus">Bonus</Option>
            <Option value="others">Others</Option>
          </Select>
        </div>
        <div className="modal-form-field">
          <h3>Date:</h3>
          <DatePicker
            style={{
              border: "1px solid transparent",
            }}
            defaultValue={moment(date, dateFormat)}
            format={dateFormat}
            onChange={handleDateChange}
          />
        </div>
        <div className="modal-form-field description">
          <h3>Description:</h3>
          <input type="text" placeholder="Enter Description" value={description.value} onChange={description.onChange}  />
        </div>
        <div className="modal-form-button">
          <button type="button" onClick={onCancel}>
            Cancel
          </button>
          {inProgress ? (
            <button type="Submit" disabled={inProgress}>
              <i class="fa fa-spinner fa-spin"></i>Submit
            </button>
          ) : (
            <button type="Submit" disabled={inProgress}>
              Submit
            </button>
          )}
        </div>
      </form>
    </div>
  );
};

//function for mapping the state to props which can then pass as an argument to the component
function mapStateToProps(state) {
  return {
    transaction: state.transaction,
  };
}

//connecting component to redux store
export default connect(mapStateToProps)(IncomeForm);
