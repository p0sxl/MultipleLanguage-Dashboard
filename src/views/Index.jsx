import {useState,useEffect} from 'react'
import {useSelector} from 'react-redux'
const Index = () => {


    const p = useSelector((state) => state.account.account)
console.log(p)
  return (
    <div>Index</div>
  )
}

export default Index