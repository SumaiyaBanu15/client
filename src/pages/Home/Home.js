import React from 'react';
import styles from './Home.module.css';
import iconImg from "../../assets/Logo_Chat.jpg";
import communityImg from "../../assets/Chat_icon.jpg";

function Home({ userName, setUserName, setStartChat, userId}) {

  const startChat = () => {
    if(!userName){
        alert("Please enter your name");
        return;
    }

    const data = {
        userName,
        id: userId
    }
    sessionStorage.setItem("user", JSON.stringify(data));
    setStartChat(true);
  }


  return <>
  <div className={styles.container}>
  <nav className={styles.navbar}>
    <h3>Chatting</h3>
    </nav>
    <div className={styles.home}>
        <div className={styles.left}>
            <h1>Community for Chatting</h1>
            <p> 
                A chat application using GraphQL Subscriptions and Web sockets for realtime chat. One click and chat with in our community.

            </p>
            <div className={styles.inputContainer}>
                <input type='text' value={userName} placeholder='Enter Your Name' onChange={(e) => setUserName(e.target.value)} 
                />
                <button onClick={startChat}>
                    <img src={iconImg} alt='icon Img' />
                </button>
            </div>
        </div>
        <div className={styles.right}>
            <img src={communityImg} alt='Community Img'/>
        </div>
    </div>
 </div>
  </>
}

export default Home