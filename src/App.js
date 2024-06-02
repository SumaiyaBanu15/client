import React from 'react';
// import {v4 as uuid} from 'uuid';
// import Home from "./pages/Home/Home.js";
// import Chat from './pages/Chat/Chat.js';
import { BrowserRouter } from "react-router-dom"
import AppRoutes from "./routes/AppRoutes.js"

function App() {
//   const [userName, setUserName] = useState("");
//   const [userId, setUserId] = useState(uuid());
//   const [startChat, setStartChat] = useState(false);

//   useEffect(() => {
// if(!startChat){
//   const data =JSON.parse(sessionStorage.getItem("user"));
//   if(data){
//     setUserName(data.userName);
//     setUserId(data.id);
//     setStartChat(true);
//   }
// }
// // eslint-disable-next-line 
//   }, []);
  

//   if(startChat){
//     return (<Chat 
//       userName = {userName}
//       userId = {userId}/>)
//   }
  return<>
  <BrowserRouter>
  <AppRoutes />
  </BrowserRouter>
  </>
  
}

export default App