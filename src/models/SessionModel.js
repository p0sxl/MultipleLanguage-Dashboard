import axios from 'axios';


export default  {
 login : async (email, password) => {
    try {
      const result = await axios.post("http://localhost:2000/login", {
        email,
        password,
      });
      if(result.data.status == 'false') {
        return {status : 'false',message : result.data.message}
      }else return {status : 'true',message : result.data.message,token : result.data.token,account : result.data.account}
    } catch (err) {
      return {status : 'error', message : err.message}
    }
  }
}