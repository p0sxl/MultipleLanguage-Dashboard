import axios from "axios";
import Cookies from "js-cookie";
import { Button } from "antd";
import { DeleteOutlined, EditOutlined,EyeOutlined } from "@ant-design/icons";
export default {
  get: async () => {
    const config = {
      headers: {
        "api-token": Cookies.get("token"),
      },
      url: "http://localhost:2000/user",
    };
    const result = await axios(config);

    if (result.data.status == "true") {
      return {
        status: "true",
        users: result.data.users,
        message: result.data.message,
      };
    } else return { status: "false", message: result.data.message };
  },
  getOne: async () => {},

  create : async (email,password,accountType) => {
    const config = {
        headers: {
          "api-token": Cookies.get("token"),
        },
        url: "http://localhost:2000/user",
        method: "POST",
        data : {
            email,
            password,
            accountType
        }
      };
      const result = await axios(config);

      if(result.data.status == 'true') return {status: 'true',user : result.data.message};
      else return {status: 'false',message: result.data.message};
  },


  getToken : async (id) => {
    const config = {
        headers: {
          "api-token": Cookies.get("token"),
        },
        url: "http://localhost:2000/token/get/" + id,
      };
      const result = await axios(config);
  
      if (result.data.status == "true") {
        return {
          status: "true",
          token: result.data.token
        };
      } else return { status: "false", message: result.data.message };
  },

  deleteUser : async (id) => {
    const config = {
        headers : {
            "api-token" : Cookies.get("token")
        },
        url : "http://localhost:2000/user/" + id,
        method : 'PUT'
    }

    const result = await axios(config);
    if(result.data.status == 'true') return true;
    else return false;
  },

  renderTable: (data,edit,del,token) => {
    const d = [];
    for (let i = 0; i < data.length; i++) {
      let type = null;
      if (data[i].accountType == "1") {
        type = "Admin";
      } else if (data[i].accountType == "2") {
        type = "User";
      } else if (data[i].accountType == "3") {
        type = "Web Service";
      }
      d.push({
        key:  Date.now() + parseInt(Math.random() *1000000),
        id: data[i]._id,
        AccountType: type,
        Email: data[i].email,
        Action: (
          <div className="flex items-center">
            <Button onClick={() => edit(data[i]._id)} type="primary" shape="circle" icon={<EditOutlined />} />
            <Button onClick={() => del(data[i]._id)} className="ml-3" type="danger" shape="circle" icon={<DeleteOutlined />} />
            
          </div>
        ),
        GetToken :  <Button style={{backgroundColor : 'black !important'}} onClick={() => token(data[i]._id)} className="ml-3" type="" shape="circle" icon={<EyeOutlined />} />
      });
    }
    return d;
  },
};
