from langchain.chains.conversation.base import ConversationChain
from langchain.memory import ConversationSummaryBufferMemory
from langchain_aws import ChatBedrock
import json
import boto3

bedrock_client = boto3.client(
    service_name='bedrock-runtime'
)

def demo_chatbot():  
    demo_llm = ChatBedrock(
        model_id="anthropic.claude-v2",
        model_kwargs= {
            "max_tokens": 500,
            "temperature": 0.1,
            "top_k": 250,
            "top_p": 1,
            "stop_sequences": ["\n\nHuman"]
        }
    )

    return demo_llm

def demo_memory():
    memeory = ConversationSummaryBufferMemory(
        llm= demo_chatbot(),
        max_token_limit= 300,
    )
    return memeory

def demo_conversation(memory,input_text):
    llm_chain_data = demo_chatbot()
    llm_conversation = ConversationChain(
        llm = llm_chain_data,
        memory= memory,
        verbose= True
    )
    chat_reply = llm_conversation.invoke(input=input_text)
    return chat_reply['response']

