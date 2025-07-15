from fastapi import APIRouter
from models import Contact
from crud import create_contact, get_contacts

router = APIRouter()

@router.post("/contacts")
def add_contact(contact: Contact):
    contact_id = create_contact(contact)
    return {"message": "Contact saved", "id": contact_id}

@router.get("/contacts")
def fetch_contacts():
    return get_contacts()
