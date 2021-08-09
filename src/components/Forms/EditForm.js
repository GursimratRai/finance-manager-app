import React, { useState } from "react";
import { useDispatch } from "react-redux";

//Use momentJs for time and formatting the dates
import moment from "moment";

//Action for Updating / Edit in the transaction
import { updateTransaction } from "../../actions/transaction";

//Custom React Hook for inputing form data and handling the change
import {useFormInput} from '../../helpers/utils';

//Use ant design components
import { DatePicker, Select, Modal } from "antd";
const { Option } = Select;

//Form for Editing in the transaction
const EditForm = (props) => {
  const { values, onSubmit, onCancel, visible } = props;
  const source = useFormInput(values.source);
  const amount = useFormInput(values.amount);
  const description = useFormInput(values.description);
  const [date, setDate] = useState(moment(values.date));
  const [category, setCategory] = useState(values.category);
  const dateFormat = "DD/MM/YYYY";
  const dispatch = useDispatch();

  //function for handling submission of the form
  const handleFormSubmit = (e) => {
    e.preventDefault();

    if (source && amount && date && category) {
      dispatch(
        updateTransaction(values.id, {
          type: values.type,
          source: source.value,
          amount: amount.value,
          date: date,
          category: category,
          description: description.value,
        })
      );
      onSubmit();
    }
  };

  //function for handling the change in the Category
  function handleCategoryChange(value) {
    setCategory(value);
  }
  //function for handling the change in the date
  function handleDateChange(value) {
    setDate(moment(value));
  }

  return (
    <Modal
      title="Edit Transaction"
      className="modal-form-title"
      visible={visible}
      closable={false}
      footer={null}
    >
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
          <input type="text" placeholder="Enter Source" required value={source.value} onChange={source.onChange} />
        </div>

        <div className="modal-form-field">
          <h3>Category:</h3>
          {values.type === "Income" ? (
            <Select
              defaultValue={values.category}
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
          ) : (
            <Select
              defaultValue={values.category}
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
          )}
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
          <input type="text" placeholder="Enter Description" value={description.value} onChange={description.onChange} />
        </div>
        <div className="modal-form-button">
          <button type="button" onClick={onCancel}>
            Cancel
          </button>
          <button type="Submit">Update</button>
        </div>
      </form>
    </Modal>
  );
};

export default EditForm;
