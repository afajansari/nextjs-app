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
import { useState } from 'react';
import firebase from 'firebase';
// import getRecipientEmail from '../utils/getRecipientEmail';


function ChatScreen({ chat, messages }) {
    const [user] = useAuthState(auth);
    const [input, setInput] = useState();
    const router = useRouter();
    const [messagesSnapshot] = useCollection(db.collection("chats").doc(router.query.id).collection("messages").orderBy("timestamp", "asc"));
    // const recipientEmail = getRecipientEmail(users, user);
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
            return JSON.parse(messages).map(message => (
                <Message
                    key={message.id}
                    user={message.user}
                    message={message} />
            ));
        }
    };

    const sendMessage = (e) => {
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
        db.collection("chats").doc(router.query.id).collection("messages").add({
            timestamp: firebase.firestore.FieldValue.serverTimestamp(),
            message: input,
            user: user.email,
            photoURL: user.photoURL,
        });
        setInput<String>('');
    }
    return (
        <Container>
            <Header>
                <Avatar />
                <HeaderInformation>
                    <h3>Rec Email</h3>
                    <p>Last Seen...</p>
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
                <EndOfMessage />
            </MessageContainer>
            <InputContainer>
                <IconButton>
                    <InsertEmoticon />
                </IconButton>
                <Input value={input} onChange={e => setInput(e.target.value)} />
                <button hidden disable= {!input} type="submit" onClick={sendMessage}> Send Message</button>
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
const EndOfMessage = styled.div``;
const MessageContainer = styled.div`
    padding: 30px;
    background-color: #e5ded8;
    height: 90vh;
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