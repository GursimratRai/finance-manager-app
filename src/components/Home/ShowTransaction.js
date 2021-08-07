import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";

//Use MomentJs for date and time
import moment from "moment";

//Action for deleting a transaction
import { deleteTransaction } from "../../actions/transaction";

//Components
import { Modal, Button, Collapse, Empty } from "antd";
import { Transaction, EditForm } from "..";

//Css file for styling
import "../../assets/css/ShowTransaction.css";

const { Panel } = Collapse;

//showing the transaction list for the selected date
const ShowTransaction = (props) => {
  const { onCancel, visible, date, list } = props;
  const [show, setShow] = useState(false);
  const [edit, setEdit] = useState(false);
  const [formValues, setFormValues] = useState("");
  const [listState, setListState] = useState([]);
  const dispatch = useDispatch();

  //Updating the state when change in list occurs i.e. add/delete/update
  useEffect(() => {
    getListState(list);
  }, [list]);

  //function for mapping the list to state
  const getListState = (list) => {
    setListState(
      list.map((item) => {
        return {
          select: false,
          type: item.type,
          id: item._id,
          date: item.date,
          source: item.source,
          category: item.category,
          amount: item.amount,
          description: item.description,
        };
      })
    );
  };

  //handling close action
  const onClose = () => {
    setShow(false);
    setEdit(false);
  };

  //handling submit action
  const onSubmit = () => {
    setShow(false);
    setEdit(false);
  };

  //show the modal contains the transaction list for the selected date
  const showTransaction = () => {
    setShow(true);
  };

  //function for handling the change in checkbox
  const handleChange = (e, id) => {
    let value = e.target.checked;
    e.stopPropagation();
    setListState(
      listState.map((item) => {
        if (item.id === id) {
          item.select = value;
        }
        return item;
      })
    );
  };

  //function for handling multiple deletion.
  const handleDelete = () => {
    let arrayids = [];
    listState.forEach((item) => {
      if (item.select) {
        arrayids.push(item.id);
      }
    });
    dispatch(deleteTransaction({ _id: arrayids }));
  };

  //function for showing and setting pre-data in Edit form
  const handleEdit = (e, id) => {
    e.stopPropagation();
    listState.map((item) => {
      if (item.id === id) {
        setEdit(true);
        setFormValues(item);
      }
      return item;
    });
  };

  //adding checkbox on Collapse's panel
  const genExtra = (select, id) => (
    <input
      id="checbox"
      type="checkbox"
      checked={select}
      onChange={(event) => {
        event.stopPropagation();
        handleChange(event, id);
      }}
    />
  );

  return (
    <div>
      <Modal
        title={[
          <div style={{ display: "flex", justifyContent: "space-between" }}>
            <span>Transactions</span>
            <span>{`${moment(date).format("ddd, MMMM Do YYYY")}`}</span>
            <span>
              <Button onClick={showTransaction} type="primary">
                <i className="fas fa-plus"></i>
              </Button>
              <Button
                type="danger"
                onClick={handleDelete}
                style={{ marginLeft: 5 }}
              >
                <i className="fas fa-trash"></i>
              </Button>
              <Button
                onClick={onCancel}
                type="primary"
                style={{
                  backgroundColor: "#4ba91d",
                  borderColor: "#39a517",
                  marginLeft: 5,
                }}
              >
                <i className="fas fa-times"></i>
              </Button>
            </span>
          </div>,
        ]}
        className="modal-form-title"
        visible={visible}
        closable={false}
        footer={null}
      >
        {listState.length > 0 ? (
          <div>
            <div className="list-item list-header">
              <span style={{ textAlign: "left", width: "5%" }}>
                <input
                  style={{ margin: 10 }}
                  type="checkbox"
                  onChange={(e) => {
                    let value = e.target.checked;
                    setListState(
                      listState.map((item) => {
                        item.select = value;
                        return item;
                      })
                    );
                  }}
                />
              </span>
              <span>Source</span>
              <span>Category</span>
              <span>Amount</span>
              <span>Action</span>
            </div>
            <div className="transaction-list-box">
              <Collapse accordion="true" expandIconPosition="right">
                {listState.map((item) => {
                  return (
                    <Panel
                      extra={genExtra(item.select, item.id)}
                      key={item.id}
                      showArrow={item.description.length === 0 ? false : true}
                      collapsible={
                        item.description.length === 0 ? "disabled" : "header"
                      }
                      header={
                        <div
                          className={`list-item ${
                            item.type === "Income" ? "success" : "error"
                          }`}
                        >
                          <span>{item.source}</span>

                          <span style={{ textAlign: "center" }}>
                            {item.category}
                          </span>

                          <span
                            style={{ textAlign: "center", paddingRight: 35 }}
                          >
                            {item.amount}
                          </span>
                          <button
                            onClick={(e) => handleEdit(e, item.id)}
                            className="edit-icon"
                          >
                            <i className="fas fa-feather-alt"></i>{" "}
                          </button>
                        </div>
                      }
                    >
                      <span>Description : </span>
                      <span>{item.description}</span>
                    </Panel>
                  );
                })}
              </Collapse>
            </div>
          </div>
        ) : (
          <div style={{ padding: 20 }}>
            <Empty
              image="https://gw.alipayobjects.com/zos/antfincdn/ZHrcdLPrvN/empty.svg"
              imageStyle={{
                height: 160,
              }}
            />
          </div>
        )}
      </Modal>

      {show && (
        <Transaction
          key="transaction-component"
          onSubmit={onSubmit}
          onCancel={onClose}
          visible={show}
          date={date}
        />
      )}
      {edit && (
        <EditForm
          key="edit-form-component"
          visible={edit}
          values={formValues}
          onSubmit={onSubmit}
          onCancel={onClose}
        />
      )}
    </div>
  );
};

export default ShowTransaction;
