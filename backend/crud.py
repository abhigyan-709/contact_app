from database import contact_collection
from models import Contact
from bson.objectid import ObjectId

def create_contact(contact: Contact):
    result = contact_collection.insert_one(contact.dict())
    return str(result.inserted_id)

def get_contacts():
    contacts = []
    for contact in contact_collection.find():
        contact["_id"] = str(contact["_id"])
        contacts.append(contact)
    return contacts
