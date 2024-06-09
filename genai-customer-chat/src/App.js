// src/App.js
import React, { useState }  from 'react';
import styled, { ThemeProvider } from 'styled-components';
import GlobalStyle from './globalStyles';
import theme from './theme';
import { FaCog, FaCommentDots, FaPhone, FaVideo, FaUserPlus, FaPlus } from 'react-icons/fa';
import messages from './messages'; 
import { formatTimestamp } from './utils';

const AppContainer = styled.div`
  display: flex;
  height: 100vh;
  overflow: hidden;
`;

const Sidebar = styled.div`
  width: 25%;
  background-color: ${(props) => props.theme.secondaryColor};
  display: flex;
  flex-direction: column;
  border-right: 1px solid #ccc;
`;

const ContactList = styled.div`
  flex: 1;
  overflow-y: auto;
`;

const Contact = styled.div`
  display: flex;
  align-items: center;
  padding: 1rem;
  border-bottom: 1px solid #ccc;
  cursor: pointer;
  &:hover {
    background-color: ${(props) => props.theme.backgroundColor};
  }
`;

const ContactInfo = styled.div`
  margin-left: 1rem;
`;

const ContactName = styled.div`
  font-weight: bold;
`;

const ContactMessage = styled.div`
  color: #888;
`;

const ChatArea = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  background-color: ${(props) => props.theme.secondaryColor};
`;

const ChatHeader = styled.div`
  padding: 1rem;
  background-color: ${(props) => props.theme.primaryColor};
  color: ${(props) => props.theme.secondaryColor};
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const ChatMessages = styled.div`
  flex: 1;
  padding: 1rem;
  overflow-y: auto;
  background-color: ${(props) => props.theme.backgroundColor};
`;

const Message = styled.div`
  display: flex;
  align-items: flex-start;
  margin-bottom: 1rem;
  flex-direction: ${props => (props.isSender ? 'row-reverse' : 'row')};
`;

const MessageContent = styled.div`
  background-color: ${(props) => (props.isSender ? props.theme.primaryColor : props.theme.secondaryColor)};
  color: ${(props) => (props.isSender ? props.theme.secondaryColor : props.theme.primaryColor)};
  padding: 1rem;
  border-radius: 10px;
  max-width: 60%;
  margin: 0 1rem;
`;

const Timestamp = styled.div`
  font-size: 0.8rem;
  color: ${props => (props.theme.timeStampColor)};
  margin-top: 0.5rem;
  text-align: ${props => ('right')};
`;

const Avatar = styled.img`
  width: 40px;
  height: 40px;
  border-radius: 50%;
`;

const ChatInputContainer = styled.div`
  display: flex;
  align-items: center;
  padding: 1rem;
  background-color: ${(props) => props.theme.secondaryColor};
  border-top: 1px solid #ccc;
`;

const ChatInput = styled.input`
  flex: 1;
  padding: 0.5rem;
  border: 1px solid #ccc;
  border-radius: 5px;
  margin-right: 1rem;
`;

const SendButton = styled.button`
  padding: 0.5rem 1rem;
  background-color: ${(props) => props.theme.primaryColor};
  color: ${(props) => props.theme.secondaryColor};
  border: none;
  border-radius: 5px;
  cursor: pointer;
`;

const NavBar = styled.div`
  background-color: ${(props) => props.theme.primaryColor};
  padding: 0.5rem;
  display: flex;
  justify-content: space-around;
  align-items: center;
`;

const NavIcon = styled.div`
  color: ${(props) => props.theme.secondaryColor};
  font-size: 1.5rem;
  cursor: pointer;
`;

const App = () => {
  const [send_message, setMessage] = useState('');
  
  const sendMessage = () => {
    // Call your send message logic here
    const latestId = messages.length
    const newMessageFromUser = {}
    const responseFromServer = {}

    newMessageFromUser["id"] = latestId + 1
    newMessageFromUser["text"] = send_message
    newMessageFromUser["sender"] = "You"
    newMessageFromUser["avatar"] = "ChloeAdams.png"
    newMessageFromUser["isSender"] = true
    newMessageFromUser["timestamp"] = new Date()
    
    // responseFromServer = SOME API CALL
    responseFromServer["id"] = newMessageFromUser["id"] + 1
    responseFromServer["text"] = "Received: " + send_message
    responseFromServer["sender"] = "BarclaysEcho"
    responseFromServer["avatar"] = "Chatbot.png"
    responseFromServer["isSender"] = false
    responseFromServer["timestamp"] = new Date()

    messages.push(newMessageFromUser)
    messages.push(responseFromServer)
    // Reset the message state after sending
    setMessage('');
  };

  const handleEnterKeyPress = (event) => {
    // Check if the key pressed is Enter (key code 13)
    if (event.key === 'Enter') {
      // Prevent the default action of the Enter key (e.g., form submission)
      event.preventDefault();
      // Call the sendMessage function
      sendMessage();
    }
  };

  return (
    <ThemeProvider theme={theme}>
      <GlobalStyle />
      <AppContainer>
        <Sidebar>
          <ContactList>
            <Contact>
              <Avatar src="Chatbot.png" alt="Avatar" />
              <ContactInfo>
                <ContactName>Barclays Echo</ContactName>
                <ContactMessage>Hey! I am BarclaysEcho, an AI-powere..</ContactMessage>
              </ContactInfo>
            </Contact>
            {/* Repeat Contact component for other contacts */}
          </ContactList>
          <NavBar>
            <NavIcon><FaCog /></NavIcon>
            <NavIcon><FaCommentDots /></NavIcon>
            <NavIcon><FaPhone /></NavIcon>
            <NavIcon><FaVideo /></NavIcon>
            <NavIcon><FaUserPlus /></NavIcon>
            <NavIcon><FaPlus /></NavIcon>
          </NavBar>
        </Sidebar>
        <ChatArea>
          <ChatHeader>
            <div>BarclaysEcho</div>
            <div>
              <FaPhone style={{ marginRight: '1rem' }} />
              <FaVideo style={{ marginRight: '1rem' }} />
            </div>
          </ChatHeader>
          <ChatMessages>
            {messages.map((message) => (
              <Message key={message.id} isSender={message.isSender}>
                <Avatar src={message.avatar} alt="Avatar" />
                <MessageContent>
                  {message.text}
                  <Timestamp isSender={message.isSender}>{formatTimestamp(message.timestamp)}</Timestamp>
                </MessageContent>
                
              </Message>
            ))}
          </ChatMessages>
          <ChatInputContainer>
            <ChatInput 
              type="text" 
              placeholder="Type your message and press enter..." 
              value={send_message}
              onChange={(e) => setMessage(e.target.value)}  
              onKeyPress={handleEnterKeyPress}
            />
            <SendButton onClick={sendMessage} on={sendMessage}>
              Send
            </SendButton>
          </ChatInputContainer>
        </ChatArea>
      </AppContainer>
    </ThemeProvider>
  );
};

export default App;
export {messages}