import { useEffect, useState } from "react";
import { Form, Input, Divider } from "antd";
const TranslationForm = ({ title, langs, onChange }) => {
  const [data, setData] = useState({});
  const [key, setKey] = useState("");
  const set = (name, val) => {
    let temp = data;
    if (!temp.name) {
      temp[name] = val;
    }
    setData(temp);
    if (onChange) onChange(temp);
  };

  useEffect(() => {
    let temp = data;
    temp["key"] = key;
    if (onChange) onChange(temp);
  }, [key]);

  return (
    <>
      <Input
        onChange={(e) => setKey(e.target.value)}
        placeholder={"Key"}
      />
      <Divider/>
      {langs.map((item, index) => (
        <div key={index} className="flex items-center mt-3">
          <p className="mr-3 font-normal">{item.toUpperCase() + ":"}</p>
          <Input
            onChange={(e) => set(e.target.name, e.target.value)}
            name={item}
          />
        </div>
      ))}
    </>
  );
};

export default TranslationForm;
