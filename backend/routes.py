from fastapi import APIRouter, HTTPException
from bson import ObjectId
from fastapi import Query
from database import contact_collection
from models import Contact
from crud import create_contact, get_contacts, update_contact, delete_contact

router = APIRouter()

@router.post("/contacts")
def add_contact(contact: Contact):
    contact_id = create_contact(contact)
    return {"message": "Contact saved", "id": contact_id}

@router.get("/contacts")
def fetch_contacts():
    return get_contacts()

@router.put("/contacts/{contact_id}")
def edit_contact(contact_id: str, contact: Contact):
    return update_contact(contact_id, contact)

@router.delete("/contacts/{contact_id}")
def remove_contact(contact_id: str):
    return delete_contact(contact_id)


@router.get("/contacts/search")
def search_contacts(query: str = Query(...)):
    results = contact_collection.find({
        "$or": [
            {"name": {"$regex": query, "$options": "i"}},
            {"email": {"$regex": query, "$options": "i"}},
            {"phone": {"$regex": query, "$options": "i"}},
        ]
    })

    return [{**c, "_id": str(c["_id"])} for c in results]
