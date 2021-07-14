import React, { useEffect, useState } from "react";
import { Modal, Button, Collapse, Empty } from "antd";
import moment from "moment";
import { Transaction } from "./";
import "../assets/css/ShowTransaction.css";
import { useDispatch } from "react-redux";
import { deleteTransaction } from "../actions/transaction";

const { Panel } = Collapse;

const ShowTransaction = (props) => {
  const { onCancel, visible, date, list } = props;
  const [show, setShow] = useState(false);
  const [listState, setListState] = useState([]);
  const dispatch = useDispatch();

  useEffect(() => {
    getListState(list);
  }, [list]);

  const getListState = (list) => {
    setListState(
      list.map((item) => {
        return {
          select: false,
          type: item.type,
          id: item._id,
          source: item.source,
          category: item.category,
          amount: item.amount,
          description: item.description,
        };
      })
    );
  };

  const onClose = () => {
    setShow(false);
  };

  const onSubmit = () => {
    setShow(false);
  };

  const showTransaction = () => {
    setShow(true);
  };

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

  const handleDelete = () => {
    let arrayids = [];
    listState.forEach((item) => {
      if (item.select) {
        arrayids.push(item.id);
      }
    });
    dispatch(deleteTransaction({ _id: arrayids }));
  };

  const genExtra = (select, id) => (
    <input
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
              <span style={{ textAlign: "left" }}>
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
                Source
              </span>
              <span>Category</span>
              <span>Amount</span>
            </div>
            <div className="transaction-list-box">
              <Collapse accordion="true" expandIconPosition="right">
                {listState.map((item) => {
                  return (
                    <Panel
                      extra={genExtra(item.select, item.id)}
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
                            style={{ textAlign: "right", paddingRight: 35 }}
                          >
                            {item.amount}
                          </span>
                        </div>
                      }
                      key={item._id}
                    >
                      <div>{item.description}</div>
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
          onSubmit={onSubmit}
          onCancel={onClose}
          visible={show}
          date={date}
        />
      )}
    </div>
  );
};

export default ShowTransaction;
