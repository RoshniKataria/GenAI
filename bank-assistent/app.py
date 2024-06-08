import streamlit as st 
import chatbot_backend as demo

# Title and Sidebar
st.set_page_config(page_title="Om's ChatBot", page_icon="🤖")
st.title("Hi, This is ChatBot created by Om")

# Sidebar for additional options
st.sidebar.title("Options")
if st.sidebar.button("Clear Chat History"):
    st.session_state.chat_history = []
    st.session_state.memory = demo.demo_memory()
    st.rerun()

if 'memory' not in st.session_state:
    st.session_state.memory = demo.demo_memory()

if 'chat_history' not in st.session_state:
    st.session_state.chat_history = []

# Display chat history
st.write("### Chat History")
for message in st.session_state.chat_history:
    with st.chat_message(message['role']):
        st.markdown(message['text'])

# User input
input_text = st.chat_input("Chat with Om's Bedrock Udemy Course Bot here")

# Process user input
if input_text:
    with st.chat_message("user"):
        st.markdown(input_text)
    st.session_state.chat_history.append({
        "role": "user",
        "text": input_text
    })

    # Generate and display chatbot response
    chat_response = demo.demo_conversation(
        input_text=input_text,
        memory=st.session_state.memory
    )

    with st.chat_message('assistant'):
        st.markdown(chat_response)
    
    st.session_state.chat_history.append({
        "role": "assistant",
        "text": chat_response
    })
