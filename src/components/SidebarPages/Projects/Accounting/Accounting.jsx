import { useState, useEffect, useContext } from "react";
import "./accounting.scss";
import "antd/dist/antd.css";
import { useNavigate } from "react-router";
import AccountingTable from "./AccountingTable";
import { ProjectContext } from "../../../../dataLayer/context/ContextProvider";
import projectsjson from "../../../../dataLayer/projects.json";
import {
  StarOutlined,
  PlusOutlined,
  WifiOutlined,
  QuestionOutlined,
  PrinterFilled,
  CopyFilled,
  DownloadOutlined,
  DeleteFilled,
} from "@ant-design/icons";
import { Modal, Input, Form, DatePicker, Select, Button } from "antd";
import moment from "moment";

const tabs = [
  { key: "1", tab: "Schedule Of Values" },
  { key: "2", tab: "Applications" },
  { key: "3", tab: "Invoicing" },
  { key: "4", tab: "Charges" },
  { key: "5", tab: "Rentals" },
];
const Accounting = () => {
  const [activeKey, setActiveKey] = useState("3");
  const [total, setTotal] = useState(null);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [invoiceModal, setInvoiceModal] = useState(false);
  // const [tableData, setTableData] = useState(projectsjson);
  const [tableData, setTableData] = useContext(ProjectContext);
  const [receivedSelected, setReceivedSelected] = useState([]);
  const [sendResetSelected, setSendResetSelected] = useState(false);
  const [actionType, setActionType] = useState("None");
  const [mark, setMarked] = useState(false);
  const [form] = Form.useForm();
  const navigate = useNavigate();

  const showModal = () => {
    setIsModalVisible(true);
  };
  const handleClose = () => {
    setIsModalVisible(false);
  };

  const retrieveSelected = (data) => {
    console.log("passing selected from child to parent", data);
    setReceivedSelected(data);
  };

  const handleCloseInvoiceSelected = () => {
    setInvoiceModal(false);
    setReceivedSelected([]);
    setSendResetSelected(true);
  };

  const handleDelete = () => {
    setActionType("delete");
  };

  useEffect(() => {
    let billedSum = 0;
    let paidSum = 0;
    let balanceSum = 0;
    tableData.map(
      (element) => (
        (billedSum = billedSum + parseInt(element.billed_amount)),
        (paidSum = paidSum + parseInt(element.paid)),
        (balanceSum = balanceSum + parseInt(element.balance))
      )
    );
    setTotal({
      total_billed: billedSum,
      total_paid: paidSum,
      total_balance: balanceSum,
    });
  }, [tableData]);

  const handleCreateNew = () => {
    showModal();
  };

  useEffect(() => {
    if (!invoiceModal && receivedSelected.length > 0) {
      setInvoiceModal(true);
    }
    if (invoiceModal && receivedSelected.length === 0) {
      setInvoiceModal(false);
    }
  }, [receivedSelected]);

  const onFinish = (values) => {
    const newItem = values;
    const lastItem = tableData.slice(-1)[0];
    newItem.date = moment(newItem.date).format("DD/MM/YYYY");
    console.log("Success:", values);
    newItem["invoice"] = parseInt(lastItem.invoice) + 1;
    if (
      newItem.project &&
      newItem.paid >= 0 &&
      newItem.invoice > 1000 &&
      newItem.billed_amount >= 0 &&
      newItem.balance >= 0
    ) {
      setTableData((prev) => [...prev, newItem]);
      console.log("Object Success:", tableData);
      form.resetFields();
      handleClose();
      setMarked(!mark);
    } else {
      alert(`Your input information is incorrect/incomplete. Try again!`);
      setMarked(!mark);
    }
  };
  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };

  return (
    <div>
      <div className="accountingTab">
        {tabs.map(({ key, tab }) => {
          return (
            <div
              className={activeKey === key ? "tabItemSelected" : "tabItem"}
              onClick={() => {
                setActiveKey(key);
              }}
            >
              <span className="tabItemLabel">{tab}</span>
            </div>
          );
        })}
      </div>
      <div className="table_container">
        <AccountingTable
          tableDataPassed={tableData}
          retrieveSelected={retrieveSelected}
          sendResetSelected={sendResetSelected}
          setSendResetSelected={setSendResetSelected}
          actionType={actionType}
          setActionType={setActionType}
          mark={mark}
        />
      </div>
      <div className="cards">
        <div
          className={
            receivedSelected.length > 0
              ? "transformed-invoice-label"
              : "side_card"
          }
        >
          {receivedSelected.length > 0 ? (
            <h1 className={"side_card_location_label"}>
              Preview Selected Invoice
            </h1>
          ) : (
            <h1 className={"side_card_location_label"}>
              {tableData[0] && tableData[0].project}
            </h1>
          )}
        </div>
        <div className="side_card">
          <StarOutlined style={{ fontSize: "20px" }} className="star_icon" />
          <WifiOutlined style={{ fontSize: "20px" }} className="wifi_icon" />
          <button
            className="add_btn"
            onClick={handleCreateNew}
            // onMouseOver={handleCreateNew}
          >
            Create New{" "}
            <PlusOutlined style={{ fontSize: "15px" }} className="plus_icon" />
          </button>
        </div>
        <div className="side_card">
          <h1 className="cost_label" style={{ paddingLeft: "30px" }}>
            ${total !== null ? total.total_billed.toFixed(2) : ""}
          </h1>
          <h1
            className="billed_label"
            style={{ paddingLeft: "30px", paddingRight: "30px" }}
          >
            Billed
          </h1>
          <QuestionOutlined
            style={{ fontSize: "15px" }}
            className="question_icon"
          />
        </div>
        <div className="side_card">
          <h1 className="cost_label" style={{ paddingLeft: "30px" }}>
            ${total !== null ? total.total_paid?.toFixed(2) : ""}
          </h1>
          <h1
            className="billed_label"
            style={{ paddingLeft: "30px", paddingRight: "30px" }}
          >
            Paid
          </h1>
          <QuestionOutlined
            style={{ fontSize: "15px" }}
            className="question_icon"
          />
        </div>
        <div className="side_card">
          <h1 className="cost_label" style={{ paddingLeft: "30px" }}>
            ${total !== null ? total.total_balance.toFixed(2) : ""}
          </h1>
          <h1
            className="billed_label"
            style={{ paddingLeft: "30px", paddingRight: "30px" }}
          >
            Balance
          </h1>
          <QuestionOutlined
            style={{ fontSize: "15px" }}
            className="question_icon"
          />
        </div>
      </div>
      <Modal
        title="Create New Invoice"
        className="create-modal"
        visible={isModalVisible}
        // onCancel={handleClose}
        footer={[
          <Button key="cancel" onClick={handleClose}>
            Cancel
          </Button>,
          <Button
            from="myForm"
            key="submit"
            htmlType="submit"
            onClick={onFinish}
          >
            Okay
          </Button>,
        ]}
      >
        <Form
          id="myForm"
          form={form}
          labelCol={{ span: 4 }}
          wrapperCol={{
            span: 14,
          }}
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
          autoComplete="off"
        >
          <Form.Item name="date" label="Date">
            <DatePicker defaultValue={moment()} />
          </Form.Item>
          <Form.Item
            name="project"
            label="Project"
            // rules={[
            //   {
            //     required: true,
            //     message: "Please input your username!",
            //   },
            // ]}
          >
            <Select>
              <Select.Option value={tableData[0].project}>
                {tableData[0].project}
              </Select.Option>
            </Select>
          </Form.Item>
          <Form.Item name="billed_amount" label="Billed">
            <Input placeholder="billed amount" />
          </Form.Item>
          <Form.Item name="paid" label="Paid">
            <Input placeholder="paid amount" />
          </Form.Item>
          <Form.Item name="balance" label="Balance">
            <Input placeholder="balance amount" />
          </Form.Item>
          <Form.Item
            wrapperCol={{
              offset: 8,
              span: 16,
            }}
          >
            <Button type="primary" htmlType="submit">
              Submit
            </Button>
          </Form.Item>
        </Form>
      </Modal>

      <div className="invoice-selected-modal">
        <Modal
          marginTop="100px"
          mask={false}
          maskClosable={false}
          visible={invoiceModal}
          onOk={() => setInvoiceModal(false)}
          onCancel={handleCloseInvoiceSelected}
          className="invoice-modal"
          footer={null}
        >
          <div className="modal-items">
            <div className="selected-card">
              <h1>
                {" "}
                {receivedSelected.length > 0 ? receivedSelected.length : 0}{" "}
              </h1>
            </div>
            <strong className="selected-label">Invoice Selected</strong>
            <div className="btns">
              <div className="btn_and_label">
                <PrinterFilled
                  onClick={() =>
                    navigate("/accounting_print", { state: receivedSelected })
                  }
                />
                <label>Print</label>
              </div>
              <div className="btn_and_label">
                <CopyFilled />
                <label>Copy</label>
              </div>
              <div className="btn_and_label">
                <DownloadOutlined />
                <label>Download</label>
              </div>
              <div className="btn_and_label">
                <DeleteFilled onClick={handleDelete} />
                <label>Delete</label>
              </div>
            </div>
          </div>
        </Modal>
      </div>
    </div>
  );
};

export default Accounting;
