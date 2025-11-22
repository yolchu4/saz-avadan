from fastapi import FastAPI
from pydantic import BaseModel
from openai import OpenAI
import os
from dotenv import load_dotenv

load_dotenv()
client = OpenAI(api_key=os.getenv("OPENAI_API_KEY"))

app = FastAPI()

class ChatMessage(BaseModel):
    message: str

@app.post("/chat")
async def chat_endpoint(data: ChatMessage):
    response = client.chat.completions.create(
        model="gpt-3.5-turbo",
        messages=[
            {"role": "system", "content": "You are a helpful support chatbot."},
            {"role": "user", "content": data.message}
        ]
    )
    reply = response.choices[0].message["content"]
    return {"reply": reply}
