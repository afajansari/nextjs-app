import React from 'react';
// import Container from '@material-ui/core/Container';
import styled from 'styled-components';
// import { StylesProvider } from "@material-ui/core/styles";
// import  Avatar from '@material-ui/core/Avatar';
// import styled from 'styled-components/cssprop'

function Sidebar() {
    // const UserAvatar = styled(Avatar)``;
    return (
        <div>
            <Container>
                <Header>
                    {/* <UserAvatar /> */}
                    Hi
                </Header>
            </Container>
        </div>
    );
    
}

export default Sidebar;

const Container = styled.div``;
const Header = styled.div``;

// const UserAvatar = styled(Avatar)`display: flex;`;