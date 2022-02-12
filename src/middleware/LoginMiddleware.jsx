import {useEffect,useState} from 'react'
import {setToken,setAccount} from '../store/account';
import { useDispatch } from 'react-redux';
import Cookies from 'js-cookie';
import axios from 'axios';
const LoginMiddleware = ({setNext,setLoading}) => {

  const dispatch = useDispatch()

  const login = async () => {
    setLoading(true);

    const token = Cookies.get('token');
    const account = Cookies.get('account');
    if(token && account) {
      const config = {
        headers : {
          "api-token":token
        },
        url : 'http://localhost:2000/token/validate',
      }
    
      try{
        const result = await axios(config); 
        if(result.data.status == 'true') {
          dispatch(setToken(result.data.token));
          dispatch(setAccount(result.data.account));
          setNext(true);
        } else {
          Cookies.remove('token')
          Cookies.remove('account');
          dispatch(setToken(""));
          dispatch(setAccount({}));


          setNext(false);
        }
      }catch(err){
        console.log(err.message);
      }

      setLoading(false);
    
      
    }else{
      setNext(false)
      setLoading(false);
    }

    /* Some Actions*/
  }

  useEffect(() => {
    (async () => {
await login();
    })()
  },[])


  
  
}

export default LoginMiddleware