from fastapi import APIRouter, HTTPException
from bson import ObjectId
from fastapi import Query
from database import contact_collection
from models import Contact
from crud import create_contact, get_contacts, update_contact, delete_contact
from fastapi.responses import StreamingResponse
import pandas as pd
from io import BytesIO
from fpdf import FPDF
from fastapi.responses import StreamingResponse
from fpdf import FPDF
from io import BytesIO

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

@router.get("/contacts/export/csv")
def export_csv():
    data = list(contact_collection.find())
    for d in data:
        d["_id"] = str(d["_id"])
    df = pd.DataFrame(data)
    buffer = BytesIO()
    df.to_csv(buffer, index=False)
    buffer.seek(0)
    return StreamingResponse(buffer, media_type="text/csv", headers={"Content-Disposition": "attachment; filename=contacts.csv"})

@router.get("/contacts/export/xlsx")
def export_xlsx():
    data = list(contact_collection.find())
    for d in data:
        d["_id"] = str(d["_id"])
    df = pd.DataFrame(data)
    buffer = BytesIO()
    with pd.ExcelWriter(buffer, engine="openpyxl") as writer:
        df.to_excel(writer, index=False)
    buffer.seek(0)
    return StreamingResponse(buffer, media_type="application/vnd.openxmlformats-officedocument.spreadsheetml.sheet", headers={"Content-Disposition": "attachment; filename=contacts.xlsx"})

@router.get("/contacts/export/pdf")
def export_pdf():
    data = list(contact_collection.find())
    for d in data:
        d["_id"] = str(d["_id"])

    pdf = FPDF()
    pdf.add_page()
    pdf.set_font("Arial", size=12)
    pdf.cell(200, 10, txt="Contact List", ln=True, align='C')

    for contact in data:
        line = f"{contact.get('name')} | {contact.get('country_code')} {contact.get('phone')} | {contact.get('email')}"
        pdf.cell(200, 10, txt=line, ln=True)

    # Write PDF to buffer
    pdf_output = pdf.output(dest='S').encode('latin1')
    buffer = BytesIO(pdf_output)
    buffer.seek(0)

    return StreamingResponse(buffer, media_type="application/pdf", headers={"Content-Disposition": "attachment; filename=contacts.pdf"})
