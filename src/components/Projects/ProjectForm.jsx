import { useEffect, useState } from "react";
import { Select, Input, Button, Tag,message,Spin,Skeleton } from "antd";
import { PlusOutlined } from "@ant-design/icons";
import UserModel from "../../models/UserModel";
const { Option } = Select;
const ProjectForm = ({onChange}) => {
  const [langs, setLangs] = useState([]);
  const [langInput,setLangInput] = useState("");
  const [projectName,setProjectName] = useState("");
  const [selectedAccount,setSelectedAccount] = useState(-1);
  const [accountList,setAccountList] = useState([]);
 
  const [loading,setLoading] = useState(false)


  const add = () => {
    if(langInput == '') return message.info("Language name is required !");
    if(langs.find(element => element == langInput)) return message.info("This language already exists!");
    setLangs([...langs,langInput]);
    setLangInput("");
  }
  const remove = (e) => {
     setLangs(langs.filter((item,index) => e !=index ))  
  }

  useEffect(() =>
  {
    if(onChange) onChange({langs,projectName,selectedAccount})
  },[langs,projectName,selectedAccount])

  useEffect(() =>{
    (async () => {
        setLoading(true)
        const res =await UserModel.get();
        if(res.status == 'true') {
            setAccountList(res.users);
            setLoading(false);
        } else message.error("Accounts not getting !")
    })()
  },[])


  return (
    <Skeleton loading={loading} active={true}>
      <div>
        <p>Project Name :</p>
        <Input onChange={(e) => setProjectName(e.target.value)} className="mt-3" />
      </div>

      <div className="mt-3">
        <p>Account ID :</p>
        <Select onChange={(e) => setSelectedAccount(e)} style={{ width: "100%" }}>
          {accountList.map((item,index) => <Option  key={index} value={item._id}>{item.email + ' | ' + item._id}</Option>)}
        </Select>
      </div>

      <div className="mt-3">
        <p>Langs :</p>
        <div className="flex items-center justify-center mt-3">
          <Input value={langInput} onChange={(e) => setLangInput(e.target.value)} className="" />
          <Button
            onClick={() =>add()}
            type="primary"
            shape="circle"
            className="ml-3"
            icon={<PlusOutlined />}
          />
        </div>

        <div className="mt-3">
            {langs.map((item,index) => <Tag onClose={() => remove(index)} key={index} closable >{item}</Tag>)}
          
        </div>
      </div>
    </Skeleton>
  );
};

export default ProjectForm;
