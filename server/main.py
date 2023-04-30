from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
import base64

app = FastAPI()

origins = [
    "http://localhost:5173",
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.post('/send-frame')
async def send_frame(image: dict):
    print(image)

    return {"message": "Image received successfully!"}