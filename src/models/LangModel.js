import axios from "axios";
import Cookies from "js-cookie";

export default {
  get: async (projectId) => {
    const config = {
      headers: {
        "api-token": Cookies.get("token"),
      },
      url: "http://localhost:2000/lang/" + projectId,
    };
    try {
      const r = await axios(config);
      if (r.data.status == "true") {
        return { status: "true", message: r.data.message, langs: r.data.langs };
      }
      return { status: "false", message: r.data.message };
    } catch (e) {
      return { status: "false", message: e.data.message };
    }
  },
};
