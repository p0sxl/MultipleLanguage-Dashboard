import {useEffect,useState} from 'react'
import LoginMiddleware from '../middleware/LoginMiddleware';
import { useNavigate } from 'react-router';
import { Spin,Card } from 'antd';
import Navbar from '../components/Navbar/Navbar';
const Dashboard = ({element}) => {

  const [loading,setLoading] = useState(true);
  const [next,setNext] = useState(false);
  const navigate = useNavigate();

  useEffect(() =>{
    if(!loading && !next){
      navigate('/login');
    }
  },[next,loading])

  

  return (
    <>

    {LoginMiddleware({setNext,setLoading})}
    <Spin spinning={loading}>
    {!loading ? (next ? (

      <><Navbar/>
      <div className="dashboard-layout">
        
        <div className="container mx-auto pt-[30px]">
          {element}
        </div>
        
        
      </div></>


    ) : '403') : ''}
    </Spin>



    </>
  )
}

export default Dashboard