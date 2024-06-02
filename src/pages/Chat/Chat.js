import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './Chat.module.css';
import chatImg from '../../assets/Msgicon.jpeg';
import { useMutation, gql} from "@apollo/client";
import Messages from '../../components/Messages';

const POST_MESSAGE = gql`
mutation ($userId: String!, $user: String!, $content: String!) {
  postMessage(userId:$userId, user:$user, content:$content)
}`
function Chat({ userName, userId,setStartChat }) {

  let navigate = useNavigate();
  const [state, setState] = useState({
    userId: userId,
    user: userName,
    content:""
  })
const [postMessage] = useMutation(POST_MESSAGE);

const onSend = () => {
  if(state.content.length > 0){
    postMessage({
      variables: state
    });
  setState({
    ...state,
    content: "",
  });
}
};
const handleBack = () => {
  setStartChat(false);
  navigate('/');
};

  return <>
  <div className={styles.container}>
    {/* <div className={styles.nav}> */}
        {/* <button> Leave as this user</button> */}
        <div className={styles.title}>
            <h1>TeleChat</h1>
            <p>This is one time chat app to chat within our community</p>
        </div>
        {/* <button>Hidden Button</button> */}
    {/* </div> */}

    <Messages />
    <div className={styles.chatContainer}>
            <div className={styles.chatInput}>
                <input type='text' name="content" 
                onChange={(e) => setState({ ...state, content: e.target.value })}
                value={state.content}
                onKeyUp={(e) => {
                  if (e.key === 'Enter') {
                    onSend();
                  }
                }}
                // onChange={(e) => {
                //   setState((prevCurrent) => ({ ...prevCurrent, content: e.target.value}
                //   ));
                // }} value={state.content} 
                // onKeyUp={(e)=>{
                //   if(e.key === 13){
                //     onSend()
                //   }
                // }}
                />
                <img src={chatImg} alt='chatImg' onClick={onSend} />
           </div>
           <center>
            <button onClick={handleBack}>Back</button>
            </center>
        </div>
  </div>
  </>
}

export default Chat