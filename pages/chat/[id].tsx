import Head from 'next/head';
import React from 'react';
import styled from 'styled-components';
import Sidebar from '../../components/Sidebar';
import ChatScreen from '../../components/ChatScreen';
import { auth, db } from '../../firebase';
import { useAuthState } from 'react-firebase-hooks/auth';
import getRecipientEmail from '../../utils/getRecipientEmail';

function Chat({ chat, messages }) {
    const [user] = useAuthState(auth);
    return (
        <Container>
            <Head>
                <title>Chat with {getRecipientEmail(chat.users, user) }</title>
            </Head>
            <Sidebar />
            <ChatContainer>
                <ChatScreen chat={chat} messages={messages}/>
            </ChatContainer>
        </Container>
    )
}
export default Chat;
export async function getServerSideProps(context) {
    const ref = db.collection('chats').doc(context.query.id);
    const messagesRes = await ref.collection('messages').orderBy('timestamp', 'asc').get();
    const messages = messagesRes.docs.map(doc => ({
        id: doc.id,
        ...doc.data(),
    })).map(messages => ({
        ...messages,
        timestamp: messages.timestamp.toDate().getTime(),
    }));

    // Prep the chat
    const chatRef = await ref.get();
    const chat = {
        id: chatRef.id,
        ...chatRef.data(),
    }
    

    return {
        props: {
            messages: JSON.stringify(messages),
            chat: chat,
        }
    }
}
const Container = styled.div`
display: flex;`;
const ChatContainer = styled.div`
flex: 1;
height: 100vh;
overflow: scroll;

::-webkit-scrollbar{
    display: none;
}

scrollbar-width: none;
-ms-overflow-style: none
`;
