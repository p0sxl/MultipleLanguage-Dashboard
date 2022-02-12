import axios from "axios";
import Cookies from "js-cookie";
import { Button } from "antd";
import { DeleteOutlined, EditOutlined, EyeOutlined } from "@ant-design/icons";
export default {
  renderTable: (data, edit, del, token) => {
    const d = [];
    for (let i = 0; i < data.length; i++) {
      d.push({
        key: Date.now() + parseInt(Math.random() * 1000000),
        order: i,
        AccountId: data[i].accountId,
        ProjectId: data[i].projectId,
        LangId: data[i].langId,
        Key: data[i].key,
        Value: data[i].value,
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

  get: async (projectId, LangId) => {
    const config = {
      headers: {
        "api-token": Cookies.get("token"),
      },
      url: "http://localhost:2000/translation/get",
      method: "POST",
      data: {
        projectId: projectId,
        langId: LangId,
      },
    };
    try {
      const res = await axios(config);
      if (res.data.status == "true")
        return {
          status: "true",
          message: res.data.message,
          translation: res.data.translation,
        };
      else return { status: "false", message: res.data.message };
    } catch (err) {
      return { status: "false", message: err.data.message };
    }
  },

  create: async (object) => {
    const config = {
      headers: {
        "api-token": Cookies.get("token"),
      },
      url: "http://localhost:2000/translation",
      method: "POST",
      data: {
        translations: object,
      },
    };
    try {
      const res = await axios(config);
      if (res.data.status == "true") {
        return {
          message: res.data.message,
          status: "true",
          translation: res.data.translation,
        };
      } else return { message: res.data.message, status: "false" };
    } catch (e) {
      return { message: e.data.message, status: "false" };
    }
  },
};
