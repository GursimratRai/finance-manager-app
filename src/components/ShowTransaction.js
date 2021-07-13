import React from "react";
import { Modal, Button, Collapse, Empty } from "antd";
import moment from "moment";
import { Transaction } from "./";
import "../assets/css/ShowTransaction.css";

const { Panel } = Collapse;

class ShowTransaction extends React.Component {
  state = {
    show: false,
  };

  onCancel = () => {
    this.setState({
      show: false,
    });
  };

  onSubmit = () => {
    this.setState({
      show: false,
    });
  };

  ShowTransaction = () => {
    this.setState({
      show: true,
    });
  };

  render() {
    const { onCancel, visible, date, list } = this.props;
    const { show } = this.state;
    const sortedList = list.sort(
      (a, b) =>
        new Date(...a.date.split("/").reverse()) -
        new Date(...b.date.split("/").reverse())
    );

    return (
      <div>
        <Modal
          title={[
            <div style={{ display: "flex", justifyContent: "space-between" }}>
              <span>Transactions</span>
              <span>{`${moment(date).format("ddd, MMMM Do YYYY")}`}</span>
              <span>
                <Button onClick={this.ShowTransaction} type="primary" danger>
                  <i className="fas fa-plus"></i>
                </Button>
                <Button
                  type="Submit"
                  form="delete-items"
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
          {sortedList.length > 0 ? (
            <div>
              <div className="list-item list-header">
                <span>Source</span>
                <span>Category</span>
                <span>Amount</span>
              </div>
              <div className="transaction-list-box">
                <form id="delete-items">
                  <Collapse expandIconPosition="right">
                    {sortedList.map((item, index) => {
                      return (
                        <Panel
                          header={
                            <div
                              className={`list-item ${
                                item.type === "Income" ? "success" : "error"
                              }`}
                            >
                              <span>
                                <span style={{ margin: "0px 10px" }}>
                                  <input
                                    type="checkbox"
                                    name="_id"
                                    value={item._id}
                                  />
                                </span>

                                <span>{item.source}</span>
                              </span>
                            
                              <span 
                                style={{ textAlign: "center" }}
                              >
                                {item.category}
                              </span>
                              
                              <span
                                style={{ textAlign: "right", paddingRight: 35 }}
                              >
                                {item.amount}
                              </span>
                            
                            </div>
                          }
                          key={item._id + index}
                        >
                          {item.description.length > 0 ? (
                            <div>{item.description}</div>
                          ) : (
                            <div>No Description</div>
                          )}
                        </Panel>
                      );
                    })}
                  </Collapse>
                </form>
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
            onSubmit={this.onSubmit}
            onCancel={this.onCancel}
            visible={show}
            date={date}
          />
        )}
      </div>
    );
  }
}

export default ShowTransaction;
