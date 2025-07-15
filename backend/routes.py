from fastapi import APIRouter, HTTPException
from bson import ObjectId

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
