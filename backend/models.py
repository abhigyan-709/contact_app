# from pydantic import BaseModel, EmailStr

# class Contact(BaseModel):
#     name: str
#     country_code: str
#     phone: str
#     email: EmailStr


from pydantic import BaseModel, EmailStr, validator
import re

class Contact(BaseModel):
    name: str
    country_code: str
    phone: str
    email: EmailStr

    @validator("country_code", pre=True)
    def validate_country_code(cls, v):
        v = str(v).strip()
        if not v.startswith("+"):
            v = f"+{v}"
        if not re.match(r"^\+\d{1,4}$", v):
            raise ValueError("Country code must be in format +<digits>")
        return v

    @validator("phone", pre=True)
    def validate_phone(cls, v):
        v = str(v).strip()
        if not re.match(r"^\d{10}$", v):
            raise ValueError("Phone number must be exactly 10 digits")
        return v


