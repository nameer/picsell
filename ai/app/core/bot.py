from langchain.chains import create_history_aware_retriever, create_retrieval_chain
from langchain.chains.combine_documents import create_stuff_documents_chain
from langchain.prompts import PromptTemplate
from langchain.schema.document import Document
from langchain_chroma import Chroma
from langchain_community.chat_message_histories import ChatMessageHistory
from langchain_core.prompts import ChatPromptTemplate, MessagesPlaceholder
from langchain_core.runnables.history import RunnableWithMessageHistory
from langchain_openai import ChatOpenAI, OpenAIEmbeddings
from langchain_text_splitters import RecursiveCharacterTextSplitter

from app.models import SummaryInput

# Set up OpenAI API key
# os.environ['OPENAI_API_KEY'] = settings.OPENAI_API_KEY


# Initialize language model
llm = ChatOpenAI(model="gpt-4o", temperature=0)


def read_text_file(file_path):
    with open(file_path, encoding="utf-8") as file:
        content = file.read()
    return content


# Specify the path to your .txt file


# Specify the path to your .txt file
file_path = "/app/app/core/Gumlet_Guide.docx.txt"

# Load and print the file content
docs = read_text_file(file_path)
print(type(docs))


text_splitter = RecursiveCharacterTextSplitter(chunk_size=1000, chunk_overlap=200)
docs = [Document(page_content=x) for x in text_splitter.split_text(docs)]

# Create vector store
vectorstore = Chroma.from_documents(documents=docs, embedding=OpenAIEmbeddings())
retriever = vectorstore.as_retriever(search_type="similarity", search_kwargs={"k": 20})

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

qa_system_prompt = """You are an sales assistant for question-answering tasks. \
Use the following pieces of retrieved context to answer the question. \
If you don't know the answer, just say that you don't know. \
Use three sentences maximum and keep the answer concise.\
Only answer from the retrieved context.
if any out of context question is asked, reply politely saying its out of your knowledge .

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

suggestion_template = PromptTemplate.from_template(
                """You are a content recommendation platform that helps companies create engaging messaging and media recommendations for advertising campaigns. You will be provided with a product description, and based on this description, perform the following tasks:
            1. Key Messaging: Identify key messages that resonate with the target audience and highlight the product's unique value propositions.
            2. Call-to-Action: Provide a compelling call-to-action that drives engagement and conversions.
            3. Media Recommendations:
            - Video Structure: Outline a suggested video structure, including a breakdown of sections with corresponding timestamps.
            - Visual Style: Recommend a visual style that aligns with the product's brand and campaign goals.
            - Engagement Elements: Suggest interactive elements (e.g., clickable links, user-generated content) that encourage audience participation.
            Ensure the responses are cohesive and in the form of complete sentences, without including any special formatting or line breaks in the response.
            Product Description: A new campaign video to promote gumlet among tech startups
            An example response:
            Content Recommendations:
            Key Messaging: Gumlet is the ultimate solution for tech startups looking to optimize their media delivery. With Gumlet, you can ensure faster load times, seamless video streaming, and superior image quality, all while reducing bandwidth costs. Our platform is designed to scale with your business, providing robust analytics and easy integration with your existing tech stack. Choose Gumlet to enhance user experience and drive growth.
            Call-to-Action: Discover how Gumlet can transform your media delivery! Sign up for a free trial today and experience the difference!
            Media Recommendations:
            Video Structure: Introduction (0:00-0:10): Briefly introduce Gumlet and its relevance to tech startups. Problem Statement (0:10-0:30): Highlight common media delivery challenges faced by tech startups. Solution Overview (0:30-1:00): Explain how Gumlet addresses these challenges with its unique features. Benefits (1:00-1:30): Showcase the key benefits of using Gumlet, such as faster load times, superior image quality, and cost savings. Customer Testimonials (1:30-2:00): Include testimonials from existing tech startup clients who have successfully used Gumlet. Call-to-Action (2:00-2:10): Encourage viewers to sign up for a free trial.
            Visual Style: The visual style should be modern and tech-savvy, incorporating sleek animations and clean graphics that reflect the innovative nature of Gumlet. Use a color palette that aligns with Gumlet's branding, such as blues and whites, to maintain brand consistency.
            Engagement Elements: Incorporate clickable links within the video that direct viewers to sign up for a free trial or learn more about specific features. Encourage user-generated content by asking viewers to share their experiences with Gumlet on social media using a branded hashtag. Additionally, consider adding interactive polls or quizzes to keep the audience engaged and gather valuable feedback.
            """
)


prompt_template = PromptTemplate.from_template(
    """
    The following is a list of dictionaries where each dictionary contains a conversation between a person and a model about a product. The input will be in the following form:

    {{
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
      "summary": {{
        "engagement_peak": [
          "45% of interactions occur after product setup segment"
        ],
        "ai_query_performance": [
          "Top handled query: How does this product integrate with other devices?"
        ],
        "customer_feedback": [
          "Overall Sentiment: 87% positive",
          "Common Feedback: Requests for more detailed videos on specific features"
        ],
        "additional_insights": [
          "Engagement is higher during hands-on segments like product setup",
          "Customer interest is focused on integration and energy-saving features",
          "AI handling of product feature questions shows high accuracy, but specific areas (energy-saving) need refinement to improve the customer experience"
        ]
      }},
      "score": 36,
      "topics": [
        {{
          "name": "Pricing",
          "subtopics": [
            {{
              "name": "Basic Plan",
              "value": 60
            }},
            {{
              "name": "Enterprise plan",
              "value": 40
            }}
          ]
        }},
        {{
          "name": "Technical support",
          "subtopics": [
            {{
              "name": "Downtime queries",
              "value": 50
            }},
            {{
              "name": "API support",
              "value": 27
            }},
            {{
              "name": "Payment failures",
              "value": 33
            }}
          ]
        }}
      ],
      "sentiments": [
        {{
          "session_id": "abc123",
          "sentiment": 1
        }},
        {{
          "session_id": "def124",
          "sentiment": -1
        }}
      ]
    }}

    The summary should be generated like the given example:

    The "score" should be calculated based on the overall tone and sentiment of the conversation sessions. The score should be on a scale of 0-100. If the user sentiment is positive or if the conversation infers that the user has a positive sentiment, assign a higher score. If the sentiment is negative, the score should decrease accordingly. Neutral conversations can lead to mid-range scores.

    The "sentiment" value should be an integer: `1` for positive, `-1` for negative, and `0` for neutral. Topics should be based on the most frequently asked questions across different sessions. If multiple topics are discussed, give the most frequently mentioned ones. Also, provide the sentiment for each session and calculate the total number of positive and negative sentiments.

    Avoid any sort of markdown in the response like ```json....```.

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


def premarket_suggestion(product_description):
    formatted_suggestion_prompt = suggestion_template.format(
        description=product_description
    )
    response = llm.invoke(formatted_suggestion_prompt)
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
