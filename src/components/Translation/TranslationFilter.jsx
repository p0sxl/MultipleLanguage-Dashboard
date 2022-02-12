import { useEffect, useState } from "react";
import { Form, Input } from "antd";
const TranslationFilter = () => {
  return (
    <>
      <Form layout="inline">
        <Form.Item name="Key">
          <Input placeholder="Key :" />
        </Form.Item>
        <Form.Item name="Value">
          <Input placeholder="Value :" />
        </Form.Item>
        <Form.Item name="AccountId">
          <Input placeholder="Account Id :" />
        </Form.Item>
        <Form.Item name="ProjectId">
          <Input placeholder="Project Id :" />
        </Form.Item>
      </Form>
    </>
  );
};

export default TranslationFilter;
