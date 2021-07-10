import React, { useState } from "react";
import {connect} from 'react-redux';
import { Modal} from "antd";
import { IncomeForm, ExpenseForm } from "./";
import '../assets/css/Transaction.css';

const Transaction = (props) => {
  const { onCancel, onSubmit,visible, date} = props;
  const [option, setOption] = useState("1");
  const changeOption = (option) => {
    setOption(option);
  };

  return (
    <div>
        <Modal
          title="New Transaction"
          className='modal-form-title'
          visible={visible}
          closable={false}
          footer={null}
        >
          <div className='modal-form-container'>
            <div className={`modal-form-option ${option==='1'?'active':''}`} onClick={() => changeOption("1")}>Income</div>
            <div className={`modal-form-option ${option==='2'?'active':''}`} onClick={() => changeOption("2")}>Expense</div>
          </div>
          {option === "1" && <IncomeForm onCancel={onCancel} onSubmit={onSubmit} date={date} />}
          {option === "2" && <ExpenseForm date={date} />}
        </Modal>
      
    </div>
  );
};

function mapStateToProps(state){
  return {
    income : state.income
  };
}

export default connect(mapStateToProps)(Transaction);