import React from "react";
import { Table } from "antd";
const TranslationTable = ({ source }) => {
  const columns = [
    {
      title: "#",
      dataIndex: "order",
      key: "order",
    },
    {
      title: "Project Id",
      dataIndex: "ProjectId",
      key: "ProjectId",
    },
    {
      title: "Account Id",
      dataIndex: "ProjectId",
      key: "ProjectId",
    },
    {
      title: "Lang Id",
      dataIndex: "LangId",
      key: "LangId",
    },
    {
      title: "Key",
      dataIndex: "Key",
      key: "Key",
    },
    {
      title: "Value",
      dataIndex: "Value",
      key: "Value",
    },
    {
      title: "Action",
      dataIndex: "Action",
      key: "Action",
    },
  ];

  return (
    <>
      <Table  columns={columns} dataSource={source} />
    </>
  );
};

export default TranslationTable;
