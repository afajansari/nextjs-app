import styled from 'styled-components';

function Message({ user, message }: {user:any, message: any}) {
    return (
        <Container>
            <p>{message.message}</p>
        </Container>
    )
}

export default Message;
const Container = styled.div``;