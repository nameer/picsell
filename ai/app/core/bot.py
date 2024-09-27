from langchain.chains import create_history_aware_retriever, create_retrieval_chain
from langchain.chains.combine_documents import create_stuff_documents_chain
from langchain.prompts import PromptTemplate
from langchain_chroma import Chroma
from langchain_community.chat_message_histories import ChatMessageHistory
from langchain_community.document_loaders import WebBaseLoader
from langchain_core.prompts import ChatPromptTemplate, MessagesPlaceholder
from langchain_core.runnables.history import RunnableWithMessageHistory
from langchain_openai import ChatOpenAI, OpenAIEmbeddings
from langchain_text_splitters import RecursiveCharacterTextSplitter

from app.models import SummaryInput

# Set up OpenAI API key
# os.environ['OPENAI_API_KEY'] = settings.OPENAI_API_KEY


# Initialize language model
llm = ChatOpenAI(model="gpt-4o-mini")

# Load and process the document
loader = WebBaseLoader("https://www.macrumors.com/roundup/iphone-16-pro/")

docs = loader.load()

text_splitter = RecursiveCharacterTextSplitter(
    chunk_size=1000, chunk_overlap=200, add_start_index=True
)
all_splits = text_splitter.split_documents(docs)

# Create vector store
vectorstore = Chroma.from_documents(documents=all_splits, embedding=OpenAIEmbeddings())
retriever = vectorstore.as_retriever(search_type="similarity", search_kwargs={"k": 6})

# Set up promptsl
contextualize_q_system_prompt = """Given a chat history and the latest user question \
which might reference context in the chat history, formulate a standalone question \
which can be understood without the chat history. Do NOT answer the question, \
just reformulate it if needed and otherwise return it as is."""
contextualize_q_prompt = ChatPromptTemplate.from_messages(
    [
        ("system", contextualize_q_system_prompt),
        MessagesPlaceholder("chat_history"),
        ("human", "{input}"),
    ]
)

qa_system_prompt = """You are an assistant for question-answering tasks. \
Use the following pieces of retrieved context to answer the question. \
If you don't know the answer, just say that you don't know. \
Use three sentences maximum and keep the answer concise.\

{context}"""
qa_prompt = ChatPromptTemplate.from_messages(
    [
        ("system", qa_system_prompt),
        MessagesPlaceholder("chat_history"),
        ("human", "{input}"),
    ]
)

# Create chains
history_aware_retriever = create_history_aware_retriever(
    llm, retriever, contextualize_q_prompt
)
question_answer_chain = create_stuff_documents_chain(llm, qa_prompt)
rag_chain = create_retrieval_chain(history_aware_retriever, question_answer_chain)

# Set up chat history management
store = {}


def get_session_history(session_id: str):
    if session_id not in store:
        store[session_id] = ChatMessageHistory()
    return store[session_id]


conversational_rag_chain = RunnableWithMessageHistory(
    rag_chain,
    get_session_history,
    input_messages_key="input",
    history_messages_key="chat_history",
    output_messages_key="answer",
)

prompt_template = PromptTemplate.from_template(
    """The following is a list of dictionaries where each dictionary contains a conversation between a person and a model about a product. The input will be in the following form:

  {{
    "vector_store_id": "18178712",
    "sessions": [
        {{
            "session_id": "abc123",
            "interactions": [
                {{
                "question": "How to access pricing page?",
                "response": "Click on pricing tab"
                }},
                {{
                "question": "How to access pricing page?",
                "response": "Click on pricing tab"
                }}
            ]
        }},
        {{
            "session_id": "def124",
            "interactions": [
                {{
                "question": "How to access pricing page?",
                "response": "Click on pricing tab"
                }},
                {{
                "question": "How to access pricing page?",
                "response": "Click on pricing tab"
                }}
            ]
        }}
     ]
  }}

  Analyze the conversation and prepare a summary of the conversation. The summary generated needs to be in the following form:

  {{
    "summary": "Areas for Improvement: Energy-saving feature questions",
    "score": 87,
    "topics": [
      {{
        "name": "Login",
        "value": 60
      }},
      {{
        "name": "Pricing",
        "value": 40
      }}
    ],
    "sentiments": [
      {{
        "session_id": "abc123",
        "sentiment": "+ve"
      }},
      {{
        "session_id": "def124",
        "sentiment": "-ve"
      }}
    ],
    "positive_sentiments": 1,
    "negative_sentiments": 1
  }}

  I need to get the output summary in the above form, where the topics are based on the most frequently asked questions in different sessions. If multiple topics are discussed, give the most frequently asked topics. Also, provide the sentiment of each conversation, and finally, give the total number of positive and negative sentiments.
  Avoid any sort of markdown in the response like ```json....``` .
  {json_input}
  """
)


# Formatting the prompt with new content


# Chatbot function
def summary_analysis(summary_input: SummaryInput):
    input_data = summary_input.json()
    formatted_prompt = prompt_template.format(json_input=input_data)
    response = llm.invoke(formatted_prompt)
    return response.content


def qa(session_id, query):
    response = conversational_rag_chain.invoke(
        {"input": query}, config={"configurable": {"session_id": session_id}}
    )
    return response["answer"]


# Run the chatbot
if __name__ == "__main__":
    # session_id = (
    #     "user_session"  # In a real application, you'd generate unique session IDs
    # )
    # print(
    #     "Chatbot: Hello! I'm ready to answer your questions. Type 'exit' to end the conversation."
    # )

    # while True:
    #     user_input = input("You: ")

    #     if user_input.lower() == "exit":
    #         print("Chatbot: Goodbye! Have a great day!")
    #         break

    #     answer = qa(session_id, user_input)

    #     print("Chatbot:", answer)

    summary_input = {
        "vector_store_id": "18178712",
        "sessions": [
            {
                "session_id": "abc123",
                "interactions": [
                    {
                        "question": "How to access pricing page?",
                        "response": "Click on pricing tab",
                    },
                    {
                        "question": "Is there a discount on bulk purchases?",
                        "response": "Yes, a 10% discount is available on purchases of over 100 units.",
                    },
                ],
            },
            {
                "session_id": "def124",
                "interactions": [
                    {
                        "question": "How to reset my password?",
                        "response": "Go to the login page and click on 'Forgot Password'.",
                    },
                    {
                        "question": "Can I change my username?",
                        "response": "Usernames are permanent and cannot be changed.",
                    },
                ],
            },
        ],
    }

    # Call the function with the dictionary input
    output_summary = summary_analysis(summary_input)

    # Print the output
    print(output_summary)
