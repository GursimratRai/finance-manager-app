import React, { useState } from "react";
import { connect,useDispatch } from "react-redux";

//Use momentJs for date and time
import moment from "moment";

//Action for creating new transaction
import { createTransaction } from "../../actions/transaction";

//Custom React Hook for inputing form data and handling the change
import {useFormInput} from '../../helpers/utils';

//Use ant design components
import { DatePicker, Select } from "antd";
const { Option } = Select;

//Form for getting expense related data 
const ExpenseForm = (props) => {
  const source = useFormInput("");
  const amount = useFormInput("");
  const description = useFormInput("");
  const [date, setDate] = useState(props.date);
  const [category, setCategory] = useState("food");
  const { onCancel, onSubmit } = props;
  const { inProgress } = props.transaction;

  const dateFormat = "DD/MM/YYYY";
  const dispatch = useDispatch();

  //handling form submission
  const handleFormSubmit = (e) => {
    e.preventDefault();

    if (source && amount && date && category) {
      dispatch(
        createTransaction({
          type:'Expense',
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
  //function for handling change in date in the form
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
            {...amount}
          />
        </div>
        <div className="modal-form-field">
          <h3>Source:</h3>
          <input type="text" placeholder="Enter Source" required {...source} />
        </div>

        <div className="modal-form-field">
          <h3>Category:</h3>
          <Select
            defaultValue="food"
            style={{ width: 120 }}
            onChange={handleCategoryChange}
          >
            <Option value="food">Food</Option>
            <Option value="social life">Social Life</Option>
            <Option value="self-development">Self Development</Option>
            <Option value="transportation">Transportation</Option>
            <Option value="Culture">Culture</Option>
            <Option value="household">Household</Option>
            <Option value="apparel">Apparel</Option>
            <Option value="beauty">Beauty</Option>
            <Option value="health">Health</Option>
            <Option value="education">Education</Option>
            <Option value="gift">Gift</Option>
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
          <input type="text" placeholder="Enter Description" {...description} />
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

//connecting component to the redux store
export default connect(mapStateToProps)(ExpenseForm);
