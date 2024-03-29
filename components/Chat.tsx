import { Avatar } from '@material-ui/core';
import { useRouter } from 'next/router';
import React from 'react'
import { useAuthState } from 'react-firebase-hooks/auth';
import { useCollection } from 'react-firebase-hooks/firestore';
import styled from 'styled-components';
import { auth, db } from '../firebase';
import getRecipientEmail from '../utils/getRecipientEmail';

function Chat({ id, users }: {id:any, users: any}) {
    const router = useRouter();
    const [user] = useAuthState(auth);
    const [recipientSnapshot] = useCollection(db.collection('user').where('email', '==', getRecipientEmail(users, user)));
    const recipient = recipientSnapshot?.docs[0]?.data();
    // console.log(recipient);
    const recipientEmail = getRecipientEmail(users, user);
    const enterChat = () => {
        router.push(`/chat/${id}`);
    }
    
    return (
        <Container onClick={enterChat} >
            {recipient ? (
                <UserAvatar src={ recipient?.photoURL}/>
            ) : (
                    
                <UserAvatar>{recipientEmail[0]}</UserAvatar>
            )
            }
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