from fastapi import FastAPI, HTTPException, Depends, UploadFile, File, Form
from fastapi.middleware.cors import CORSMiddleware
from fastapi.staticfiles import StaticFiles
from fastapi.responses import JSONResponse
from pymongo import MongoClient
from pydantic import BaseModel
from typing import List, Optional
import os
import uuid
from datetime import datetime
import json
from dotenv import load_dotenv

load_dotenv()

app = FastAPI(title="Magical Gift API", version="1.0.0")

# CORS setup
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# MongoDB connection
MONGO_URL = os.getenv("MONGO_URL", "mongodb://localhost:27017/magical_gift_db")
client = MongoClient(MONGO_URL)
db = client.magical_gift_db

# Models
class PasswordEntry(BaseModel):
    password: str

class PhotoUpload(BaseModel):
    id: str
    filename: str
    upload_date: datetime
    section: str
    description: Optional[str] = None

class MessageEntry(BaseModel):
    id: str
    content: str
    section: str
    created_date: datetime

# Routes
@app.get("/api/health")
async def health_check():
    return {"status": "healthy", "message": "Magical Gift API is running"}

@app.post("/api/verify-password")
async def verify_password(entry: PasswordEntry):
    if entry.password.strip().upper() == "LET ME IN":
        return {"valid": True, "message": "Welcome to the magical realm!"}
    return {"valid": False, "message": "Those aren't the magical words..."}

@app.post("/api/upload-photo")
async def upload_photo(
    file: UploadFile = File(...),
    section: str = Form(...),
    description: str = Form(None)
):
    try:
        # Generate unique filename
        file_extension = file.filename.split('.')[-1] if '.' in file.filename else 'jpg'
        unique_filename = f"{uuid.uuid4()}.{file_extension}"
        
        # Create upload directory if it doesn't exist
        upload_dir = "/app/frontend/public/uploads"
        os.makedirs(upload_dir, exist_ok=True)
        
        # Save file
        file_path = os.path.join(upload_dir, unique_filename)
        content = await file.read()
        with open(file_path, "wb") as buffer:
            buffer.write(content)
        
        # Store metadata in database
        photo_data = {
            "id": str(uuid.uuid4()),
            "filename": unique_filename,
            "original_filename": file.filename,
            "upload_date": datetime.now(),
            "section": section,
            "description": description,
            "file_path": f"/uploads/{unique_filename}"
        }
        
        db.photos.insert_one(photo_data)
        
        return {
            "success": True,
            "photo_id": photo_data["id"],
            "filename": unique_filename,
            "path": f"/uploads/{unique_filename}"
        }
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Upload failed: {str(e)}")

@app.get("/api/photos/{section}")
async def get_photos_by_section(section: str):
    try:
        photos = list(db.photos.find({"section": section}, {"_id": 0}))
        return {"photos": photos}
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Failed to retrieve photos: {str(e)}")

@app.get("/api/photos")
async def get_all_photos():
    try:
        photos = list(db.photos.find({}, {"_id": 0}))
        return {"photos": photos}
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Failed to retrieve photos: {str(e)}")

@app.post("/api/save-message")
async def save_message(message: MessageEntry):
    try:
        message_data = {
            "id": message.id,
            "content": message.content,
            "section": message.section,
            "created_date": message.created_date
        }
        db.messages.insert_one(message_data)
        return {"success": True, "message": "Message saved successfully"}
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Failed to save message: {str(e)}")

@app.get("/api/messages/{section}")
async def get_messages_by_section(section: str):
    try:
        messages = list(db.messages.find({"section": section}, {"_id": 0}))
        return {"messages": messages}
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Failed to retrieve messages: {str(e)}")

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8001)