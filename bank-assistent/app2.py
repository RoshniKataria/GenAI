import streamlit as st
import chatbot_backend as demo
from datetime import datetime

# Page Configuration
st.set_page_config(page_title="Banking Assistant ChatBot", page_icon="🏦")

# Custom CSS for styling
st.markdown("""
    <style>
    body {
        background-color: #f5f5f5;
    }
    .main-title {
        color: #004080;
        font-family: 'Arial Black', sans-serif;
    }
    .user-message {
        text-align: right;
        background-color: #e3f2fd;
        border-radius: 10px;
        padding: 10px;
        margin: 5px 0;
        color: #004080;
    }
    .assistant-message {
        text-align: left;
        background-color: #e0f7fa;
        border-radius: 10px;
        padding: 10px;
        margin: 5px 0;
        color: #00796b;
    }
    .message-container {
        max-height: 400px;
        overflow-y: auto;
        padding-right: 10px;
    }
    .timestamp {
        font-size: 10px;
        color: grey;
        text-align: right;
    }
    .chat-input label {
        color: #004080;
    }
    </style>
    """, unsafe_allow_html=True)

st.markdown("<h1 class='main-title'>Banking Assistant ChatBot</h1>", unsafe_allow_html=True)

# Sidebar for additional options
st.sidebar.title("Options")
if st.sidebar.button("Clear Chat History"):
    st.session_state.chat_history = []
    st.session_state.memory = demo.demo_memory()
    st.experimental_rerun()

if 'memory' not in st.session_state:
    st.session_state.memory = demo.demo_memory()

if 'chat_history' not in st.session_state:
    st.session_state.chat_history = []

# Function to update chat container
def update_chat_container():
    chat_html = '<div class="message-container" id="chat-container">'
    for message in st.session_state.chat_history:
        role_class = "user-message" if message['role'] == 'user' else "assistant-message"
        chat_html += f'<div class="{role_class}"><p>{message["text"]}</p><div class="timestamp">{message["time"]}</div></div>'
    chat_html += '</div>'
    chat_container.markdown(chat_html, unsafe_allow_html=True)
    # JavaScript to scroll to the bottom of the chat container
    st.markdown("""
        <script>
        const chatContainer = document.getElementById('chat-container');
        chatContainer.scrollTop = chatContainer.scrollHeight;
        </script>
        """, unsafe_allow_html=True)

# Display chat history
st.write("### Chat History")
chat_container = st.empty()
update_chat_container()

# Add a greeting message from the assistant if the chat history is empty
if not st.session_state.chat_history:
    greeting_message = "Hello! I am your Banking Assistant. How can I assist you today?"
    current_time = datetime.now().strftime("%Y-%m-%d %H:%M:%S")
    st.session_state.chat_history.append({
        "role": "assistant",
        "text": greeting_message,
        "time": current_time
    })
    update_chat_container()

# User input
input_text = st.chat_input("Chat with your Banking Assistant here")

# Process user input
if input_text:
    current_time = datetime.now().strftime("%Y-%m-%d %H:%M:%S")
    
    # Append user message to chat history
    st.session_state.chat_history.append({
        "role": "user",
        "text": input_text,
        "time": current_time
    })

    # Update chat container with user message
    update_chat_container()
    
    # Get assistant response
    chat_response = demo.demo_conversation(
        input_text=input_text,
        memory=st.session_state.memory
    )

    # Append assistant response to chat history
    current_time = datetime.now().strftime("%Y-%m-%d %H:%M:%S")
    st.session_state.chat_history.append({
        "role": "assistant",
        "text": chat_response,
        "time": current_time
    })

    # Update chat container with assistant message
    update_chat_container()
