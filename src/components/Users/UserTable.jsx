import React from "react";
import { Table } from "antd";
const UserTable = ({ source }) => {
  const columns = [
    {
      title: "ID",
      dataIndex: "id",
      key: "id",
    },
    {
      title: "Email",
      dataIndex: "Email",
      key: "Email",
    },

    {
      title: "Account Type",
      dataIndex: "AccountType",
      key: "AccountType",
    },
    {
      title : "Get Token",
      dataIndex: "GetToken",
      key : "GetToken",
    },
    {
      title : "Action",
      dataIndex: "Action",
      key : "Action",
    },
   
  ];

  return <Table dataSource={source} columns={columns} />;
};

export default UserTable;
