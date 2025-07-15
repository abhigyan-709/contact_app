from pydantic import BaseModel, EmailStr

class Contact(BaseModel):
    name: str
    country_code: str
    phone: str
    email: EmailStr
