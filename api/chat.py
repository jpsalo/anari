from langchain_core.globals import set_verbose, set_debug
from langchain_core.output_parsers import StrOutputParser
from langchain_core.prompts import ChatPromptTemplate
from langchain_core.runnables import RunnablePassthrough
from langchain_ollama import ChatOllama

set_debug(True)
set_verbose(True)


class Chat:
    def __init__(self, statistics, llm_model: str = "llama3.2"):
        self.model = ChatOllama(model=llm_model)
        self.prompt = ChatPromptTemplate.from_messages(
            [
                (
                    "system",
                    "You are an NHL statistics expert. Given the summary statistics data about NHL players {context}, answer the questions.",
                ),
                ("human", "{question}"),
            ]
        )
        self.chain = (
            {"context": lambda x: statistics, "question": RunnablePassthrough()}
            | self.prompt
            | self.model
            | StrOutputParser()
        )

    def ask(self, query: str):
        return self.chain.invoke(query)
