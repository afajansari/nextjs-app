import { Avatar } from '@material-ui/core';
import React from 'react'
import { useAuthState } from 'react-firebase-hooks/auth';
import styled from 'styled-components';
import { auth } from '../firebase';
import getRecipientEmail from '../utils/getRecipientEmail';

function Chat({ id, users }) {      
    const [user] = useAuthState(auth);
    // console.log(users)
    const recipientEmail = getRecipientEmail(users, user);
    // console.log('recipient'+ ' => ' + recipientEmail);
    
    return (
        <Container>
            <UserAvatar />
            <p>{recipientEmail}</p>
        </Container>
    )
}

export default Chat
const Container = styled.div`
display: flex;
align-items: center;
cursor: pointer;
padding:15px;
word-break: break-word;
:hover{
    background-color: #ececec;
}`;
const UserAvatar = styled(Avatar)`
margin:5px;
margin-right: 15px;`;