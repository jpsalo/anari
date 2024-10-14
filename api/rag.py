from langchain.schema.output_parser import StrOutputParser
from langchain.schema.runnable import RunnablePassthrough
from langchain_chroma import Chroma
from langchain_community.document_loaders.csv_loader import CSVLoader
from langchain_community.embeddings import FastEmbedEmbeddings
from langchain_core.globals import set_verbose, set_debug
from langchain_core.prompts import ChatPromptTemplate
from langchain_ollama import ChatOllama
from flask import current_app

set_debug(True)
set_verbose(True)


class ChatRAG:
    vector_store = None
    retriever = None
    chain = None

    def __init__(self, llm_model: str = "llama3.2"):
        self.persist_directory = current_app.root_path + "/data/chroma_db"
        template = """Answer the question based on the following context:
        {context}

        Question: {question}
        """
        self.prompt = ChatPromptTemplate.from_template(template)
        # self.prompt = ChatPromptTemplate(
        #     [
        #         (
        #             "human",
        #             """Answer the question based only on the following context:
        #             {context}
        #
        #             Question: {question}
        #             """,
        #         ),
        #     ]
        # )
        self.model = ChatOllama(model=llm_model)

        self.vector_store = None
        self.retriever = None
        self.chain = None

    def ingest_csv(self, csv_file_path: str):
        loader = CSVLoader(file_path=csv_file_path, autodetect_encoding=True)
        data = loader.load()

        self.vector_store = Chroma.from_documents(
            documents=data,
            embedding=FastEmbedEmbeddings(),
            persist_directory=self.persist_directory,
        )
        self.retriever = self.vector_store.as_retriever()

        self.chain = (
            {"context": self.retriever, "question": RunnablePassthrough()}
            | self.prompt
            | self.model
            | StrOutputParser()
        )

    def ask(self, query: str):
        if not self.chain:
            return "Please, add a document first."

        return self.chain.invoke(query)

    def clear(self):
        self.vector_store = None
        self.retriever = None
        self.chain = None
