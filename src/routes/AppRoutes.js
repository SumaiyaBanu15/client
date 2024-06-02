import React, {useState, useEffect} from 'react'
import { Route, Routes } from 'react-router-dom'
import Home from '../pages/Home/Home'
import Chat from '../pages/Chat/Chat';
import {v4 as uuid} from 'uuid';

function AppRoutes() {
    const [userName, setUserName] = useState("");
    const [userId, setUserId] = useState(uuid());
    const [startChat, setStartChat] = useState(false);
  
    useEffect(() => {
  if(!startChat){
    const data =JSON.parse(sessionStorage.getItem("user"));
    if(data){
      setUserName(data.userName);
      setUserId(data.id);
      setStartChat(true);
    }
  }
    }, [startChat]);

    useEffect(() => {
      if (startChat) {
          sessionStorage.setItem("user", JSON.stringify({ userName, id: userId }));
      }
  }, [startChat, userName, userId]);
    
  
    if(startChat){
      return (<Chat 
        userName = {userName}
        userId = {userId}
        setStartChat = {setStartChat}/>)
    }
  return <>
  <div id='wrapper'>

    <Routes>
        <Route path='/' element={<Home 
        userName = {userName}
        setUserName = {setUserName}
        setStartChat = {setStartChat}
        userId = {userId}/> }/>
    </Routes>

  </div>
  </>
}

export default AppRoutes