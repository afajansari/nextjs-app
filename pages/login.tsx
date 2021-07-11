import { Button } from '@material-ui/core';
import Head from 'next/head';
import styled from 'styled-components';
import { auth, db, provider } from '../firebase';

export default function login() {
    const signIn = () => {
        auth.signInWithPopup(provider).catch(alert);
    }
    return (
        <Container>
            <Head>
                <title>Login Page</title>
            </Head>
            <LogoContainer>
                <Logo width="120" src='https://cdn.pngsumo.com/whatsapp-logo-transparent-png-stickpng-whatsapppng-1000_1000.png' />
                <Button onClick={signIn} style={{ width: "100%"}} variant='outlined'>Sign in with Google</Button>
            </LogoContainer>

        </Container>
    )
}
const Container = styled.div`
display: grid;
place-items:center;
height: 100vh;
background-color: whitesmoke;
`;
    
const LogoContainer = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    margin:auto;
    padding: 100px;
    background-color: white;
    box-shadow: 0 0 30px #0000001a;
    border-radius: 6px;
    `;
const Logo = styled.img`
    width:120px;
    margin-bottom:30px;
    `;