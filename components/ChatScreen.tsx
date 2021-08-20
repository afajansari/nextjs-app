import { Avatar, IconButton } from '@material-ui/core';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import AttachFileIcon from '@material-ui/icons/AttachFile';
import { useRouter } from 'next/router';
import { useAuthState } from 'react-firebase-hooks/auth';
import styled from 'styled-components';
import { auth, db } from '../firebase';
import { useCollection } from 'react-firebase-hooks/firestore';
import Message from './Message';
import { InsertEmoticon } from '@material-ui/icons';
import MicIcon from '@material-ui/icons/Mic'
import React, { useRef, useState } from 'react';
import firebase from 'firebase';
import TimeAgo from 'timeago-react'
import getRecipientEmail from '../utils/getRecipientEmail';
// import getRecipientEmail from '../utils/getRecipientEmail';


function ChatScreen({ chat, messages }: {chat:any, messages:any}) {
    const [user]:any = useAuthState(auth);
    const [input, setInput] = useState('');
    const endOfMessageRef = useRef(null)
    const router = useRouter();
    const [messagesSnapshot] = useCollection(db.collection("chats").doc(router.query.id as string).collection("messages").orderBy("timestamp", "asc"));
    const [recipientSnapshot] = useCollection(db.collection("user").where("email", "==", getRecipientEmail(chat.users, user)));
    // console.log(recipientSnapshot);
    
    const showMessages = () => {
        if (messagesSnapshot) {
            return messagesSnapshot.docs.map(message => (
                <Message
                    key={message.id}
                    user={message.data().user}
                    message={{
                        ...message.data(),
                        timestamp: message.data().timestamp?.toDate().getTime(),
                    }} />
            ));
        } else {
            return JSON.parse(messages).map( (message:any) => (
                <Message
                    key={message.id}
                    user={message.user}
                    message={message} />
            ));
        }
    };
    const scrollToBottom = () => {
        endOfMessageRef.current.scrollIntoView({
            behavior: 'smooth',
            block: 'start'
        })
    }
 
    const sendMessage = (e: any) => {
        e.preventDefault();
        // Update the last seen...
        db.collection("users").doc(user.uid).set(
            {
                lastSeen: firebase.firestore.FieldValue.serverTimestamp(),
            },
            {
                merge: true
            }
        );
        db.collection("chats").doc(router.query.id as string).collection("messages").add({
            timestamp: firebase.firestore.FieldValue.serverTimestamp(),
            message: input,
            user: user.email,
            photoURL: user.photoURL,
        });
        setInput('');
        scrollToBottom();
    };
    const recipient = recipientSnapshot?.docs?.[0].data();
    // console.log(recipient);
    
    const recipientEmail = getRecipientEmail(chat.users, user);
    return (
        <Container>
            <Header>
                { recipient ? (
                    <Avatar src={recipient?.photoURL} />
                ) : (
                        <Avatar>{recipientEmail[0]}</Avatar>
                )
                }
                <HeaderInformation>
                    <h3>{recipientEmail}</h3>
                    {recipientSnapshot ? (
                        <p>Last active: {' '}
                            {recipient?.lastSeen?.toDate() ? (
                               <TimeAgo datetime={recipient?.lastSeen?.toDate()} /> 
                            ) : "Unavailable"
                            }
                        </p>
                    ) : (
                            <p>Loading Last Active...

                            </p>
                    )}
                </HeaderInformation>
                <HeaderIcons>
                    <IconButton>
                        <AttachFileIcon />
                    </IconButton>
                    <IconButton>
                        <MoreVertIcon />
                    </IconButton>
                </HeaderIcons>
            </Header>
            <MessageContainer>
                {/* show messages */}
                {showMessages()}
                <EndOfMessage ref={ endOfMessageRef}/>
            </MessageContainer>
            <InputContainer>
                <IconButton>
                    <InsertEmoticon />
                </IconButton>
                <Input value={input} onChange={e => setInput(e.target.value)} />
                <button hidden disabled= {!input} type="submit" onClick={sendMessage}> Send Message</button>
                <IconButton>
                    <MicIcon />
                </IconButton>
            </InputContainer>
        </Container>
    )
}

export default ChatScreen
const Container = styled.div``;
const Header = styled.div`
    position: sticky;
    background-color: #fff;
    z-index: 100;
    top: 0;
    display: flex;
    padding:11px;
    height: 80px;
    align-items: center;
    border-bottom: 1px solid whitesmoke;`;
const HeaderInformation = styled.div`
    margin-left:15px;
    flex: 1;
    >h3{
        margin-bottom: 2px;
        margin-top:0
    }
    >p{
        font-size: 14px;
        color: gray;
        margin:0
    }
`;
const HeaderIcons = styled.div``;
const EndOfMessage = styled.div`
margin-bottom: 50px;`;
const MessageContainer = styled.div`
    padding: 30px;
    background-color: #e5ded8;
    height: 75vh;
    overflow: auto;
`;
const InputContainer = styled.form`
    display: flex;
    align-items: center;
    position: sticky;
    bottom: 0;
    background-color: white;
    z-index: 100;
    padding: 10px;
`;

const Input = styled.input`
    flex:1;
    padding: 20px;
    outline: 0;
    border: none;
    background-color: whitesmoke;
    border-radius: 10px;
    margin-left: 15px;
    margin-right: 15px;
`;