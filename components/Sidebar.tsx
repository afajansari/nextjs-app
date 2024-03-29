import React from "react";
// import Container from '@material-ui/core/Container';
import styled from "styled-components";
import { StylesProvider } from "@material-ui/core/styles";
import { Avatar, IconButton, Button } from "@material-ui/core";
import ChatIcon from "@material-ui/icons/Chat";
import SearchIcon from "@material-ui/icons/Search";
import MoreVertIcon from "@material-ui/icons/MoreVert";
import * as EmailValidator from "email-validator";
// import styled from 'styled-components/cssprop'
import { auth, db } from "../firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import { useCollection } from "react-firebase-hooks/firestore";
import Chat from "./Chat";

function Sidebar() {
  // const UserAvatar = styled(Avatar)``;
  const [user]:any = useAuthState(auth);
  const userChatRef = db.collection("chats").where("users", "array-contains", user.email);
  const [chatsSnapshot] = useCollection(userChatRef);
  const createChat = () => {
    const input = prompt("Please Enter an Email to create a new user chat.");
    if (!input) return null;
    if (EmailValidator.validate(input) && !chatAlreadyExists(input) && input !== user.email) {
      // we need to add the chat in to DB 'chats' collection
      db.collection("chats").add({
        users: [user.email, input],
      });
    }
  };
  const chatAlreadyExists = (recipientEmail: string) => 
    !!chatsSnapshot?.docs.find(
        (chat) => chat.data().users.find((user: string) => user === recipientEmail)?.length > 0
    );
  return (
    <div>
      <StylesProvider injectFirst>
        <Container>
          <Header>
            <UserAvatar src={user?.photoURL} onClick={() => auth.signOut()} />
            <IconsContainer>
              <IconButton>
                <ChatIcon />
              </IconButton>
              <IconButton>
                <MoreVertIcon />
              </IconButton>
            </IconsContainer>
          </Header>
          <Search>
            <SearchIcon />
            <SearchInput placeholder="Search" />
          </Search>
                  {/* {console.log(chat.data().users)} */}
          <SidebarButton onClick={createChat}>Start New Chat</SidebarButton>
                  {/* List of Chat */}
                  {chatsSnapshot?.docs.map(chat => (<Chat key={chat.id} id={chat.id} users={chat.data().users} />))}
                  
        </Container>
      </StylesProvider>
    </div>
  );
}

export default Sidebar;

const Container = styled.div`
  flex: 0.45;
  border-right: 1px solid whitesmoke;
  min-width: 300px;
  max-width: 350px;
  height: 100vh;
  overflow-y: scroll;
  ::-webkit-scrollbar{
    display: none;
  }
  -ms-overflow-style: none;
  scrollbar-width: none;
`;
const Header = styled.div`
  display: flex;
  position: sticky;
  top: 0;
  background-color: #fff;
  z-index: 1;
  justify-content: space-between;
  align-items: center;
  padding: 15px;
  height: 80px;
  border-bottom: 1px solid whitesmoke;
`;

const UserAvatar = styled(Avatar)`
  cursor: pointer;
  :hover {
    color: red;
    background-color: lightgray;
    opacity: 0.8;
  }
`;
const IconsContainer = styled.div``;
const Search = styled.div`
  display: flex;
  align-items: center;
  padding: 20px;
  border-radius: 2px;
`;
const SearchInput = styled.input`
  outline-width: 0;
  outline: none;
  border: 0;
  flex: 1;
  padding: 10px;
  height: 45px;
`;
const SidebarButton = styled(Button)`
  width: 100%;
  border-top: 1px solid whitesmoke;
  border-bottom: 1px solid whitesmoke;
`;
