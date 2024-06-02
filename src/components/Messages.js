import React from 'react';
import {gql, useSubscription} from "@apollo/client";
import styles from "./Messages.module.css";

const GET_MESSAGES =  gql`
subscription {
    messages {
        id
        userId
        content
        user
    }
}
`
function Messages() {
    const { data, error } = useSubscription(GET_MESSAGES);

    console.log("Subscription data: ", data);
    
    // if(loading){ 
    //     console.log("Loading...");
    // return <div> &nbsp;&nbsp;&nbsp;&nbsp; Loading... </div>
    // }

    if(error) {
        console.error("Error is:", error);
        return <div>Error: {error.message} </div>
    }
    
if(!data || !data.messages || data.messages.length === 0)
    {
        console.log("No messages found!")
    return <div>No message yet!</div>;
}
console.log("Messages received:", data.messages);

  return <>
    {/* {
        data.messages.map(({id, userId, user:messageUser, content}, index) => (
            <div key={id} style={{
            }} 
            >
            <h4> {content} </h4>
            </div>
        ))
    } */}
    <div className={styles.messages}>
        {/* <h2> Messages</h2> */}
        {data.messages.map((message) => (
            <div key={message.id} className={styles.message}>
                <p> {message.content}</p>
                <p> From: {message.user}</p>
                </div>
        ))}
    </div>
  </>
}

export default Messages