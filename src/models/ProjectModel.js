import axios from "axios";
import Cookies from "js-cookie";
import { Button,Tag } from "antd";
import { DeleteOutlined, EditOutlined, EyeOutlined } from "@ant-design/icons";
export default {
  get: async () => {
    const config = {
      headers: {
        "api-token": Cookies.get("token"),
      },
      url: "http://localhost:2000/project",
    };
    try {
      const r = await axios(config);
      if (r.data.status == "true") {
        return { status: "true", projects: r.data.projects };
      } else return { status: "false", message: r.data.message };
    } catch (err) {
      return { status: "false", message: err.data.message };
    }
  },

  create: async (accountId, projectName, langs) => {
    const config = {
      headers: {
        "api-token": Cookies.get("token"),
      },
      data: {
        accountId: accountId,
        projectName: projectName,
        langs: JSON.stringify(langs),
      },
      url: "http://localhost:2000/project",
      method: "POST",
    };
    try {
      const result = await axios(config);
      if (result.data.status == "true") {
        return {
          status: "true",
          message: result.data.message,
          project: result.data.project,
        };
      } else return { status: "false", message: result.data.message };
    } catch (err) {
      return { status: "false", message: err.data.message };
    }
  },

  destroy : async (id) => {

    const config = {
      headers : {
        "api-token" : Cookies.get('token')
      },
      url : "http://localhost:2000/project/" + id,
      method : "DELETE"
    }

    try{
      const res = await axios(config);
      if(res.data.status == 'true') return {status : 'true',message : res.data.message}; else return {status : 'false',message : res.data.message};
    }catch(e){
      return {status : 'false',message : e.data.message}; 
    }
  },

  renderTable: (data, edit, del, token) => {
    const d = [];
    for (let i = 0; i < data.length; i++) {
      d.push({
        key: Date.now() + parseInt(Math.random() * 1000000),
        order: data[i]._id,
        AccountId: data[i].accountId,
        ProjectName: data[i].projectName,
        Languages : data[i].langs.map((item,index) => <Tag key={index} >{item}</Tag>),
        Action: (
          <div className="flex items-center">
            <Button
              onClick={() => edit(data[i]._id)}
              type="primary"
              shape="circle"
              icon={<EditOutlined />}
            />
            <Button
              onClick={() => del(data[i]._id)}
              className="ml-3"
              type="danger"
              shape="circle"
              icon={<DeleteOutlined />}
            />
          </div>
        ),
      });
    }
    return d;
  },
};
