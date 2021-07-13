import React, { useState } from "react";
import { connect,useDispatch } from "react-redux";
import { DatePicker, Select } from "antd";
import moment from "moment";
import { createTransaction } from "../actions/transaction";

const { Option } = Select;

function useFormInput(initialValue) {
  const [value, setValue] = useState(initialValue);

  function handleChange(e) {
    setValue(e.target.value);
  }

  return {
    value,
    onChange: handleChange,
  };
}

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

  function handleCategoryChange(value) {
    console.log(`selected ${value}`);
    setCategory(value);
  }
  function handleDateChange(value) {
    console.log(`Date changed ${moment(value).format("DD-MM-YYYY")}`);
    setDate(moment(value));
  }

  return (
    <div>
      <form className="modal-form" onSubmit={handleFormSubmit}>
        <div className="modal-form-field">
          <h3>Amount:</h3>
          <input
            type="Number"
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

function mapStateToProps(state) {
  return {
    transaction: state.transaction,
  };
}

export default connect(mapStateToProps)(ExpenseForm);
