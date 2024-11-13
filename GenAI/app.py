import streamlit as st

def responseFromKB(user_input):
    kBResponse = "my-response"
    return kBResponse

# Title and Sidebar
st.set_page_config(page_title="Confluece GPT", page_icon="")
st.title("Beyond Human")
st.sidebar.title("Options")

# Sidebar for additional options
if st.sidebar.button("Clear Chat History"):
    # Clear session state memory
    st.session_state.chat_history = []
    st.rerun()

if 'chat_history' not in st.session_state:
    st.session_state.chat_history = []

# Display chat history
st.write("### Chat")

for message in st.session_state.chat_history:
    with st.chat_message(message['role']):
        st.markdown(message['text'])

# User input
input_text = st.chat_input("Chat with Confluece database Bot here")

# Process user input
if input_text:
    with st.chat_message("user"):
        st.markdown(input_text)
    st.session_state.chat_history.append({
        "role": "user",
        "text": input_text
    })

    chat_response = "gpt response"  # Replace with actual response logic
    with st.chat_message("assistant"):
        st.markdown(chat_response)
    st.session_state.chat_history.append({
        "role": "assistant",
        "text": chat_response
    })
