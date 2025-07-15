from database import contact_collection
from models import Contact
from bson.objectid import ObjectId
from fastapi import HTTPException

# Create contact
def create_contact(contact: Contact):
    result = contact_collection.insert_one(contact.dict())
    return str(result.inserted_id)

# Read contacts
def get_contacts():
    contacts = []
    for contact in contact_collection.find():
        contact["_id"] = str(contact["_id"])
        contacts.append(contact)
    return contacts

# Update contact
def update_contact(contact_id: str, contact: Contact):
    result = contact_collection.update_one(
        {"_id": ObjectId(contact_id)},
        {"$set": contact.dict()}
    )
    if result.matched_count == 0:
        raise HTTPException(status_code=404, detail="Contact not found")
    return {"msg": "Contact updated"}

# Delete contact
def delete_contact(contact_id: str):
    result = contact_collection.delete_one({"_id": ObjectId(contact_id)})
    if result.deleted_count == 0:
        raise HTTPException(status_code=404, detail="Contact not found")
    return {"msg": "Contact deleted"}
