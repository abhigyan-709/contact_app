# 📒 Contact Book App

A full-stack Contact Book application built using:

- ⚙️ **Backend**: FastAPI + MongoDB
- 💻 **Frontend**: React + Material UI (via Yarn)
- 🐳 **Docker**: For containerized local development

---

## 🧩 Features

- Add new contacts with:
  - Name
  - Country code
  - Phone number
  - Email (with validation)
- View list of saved contacts
- Connected to a MongoDB database
- Built for local development with Docker Compose

---

## 📁 Project Structure

```
contact_app/
├── backend/
│   ├── main.py
│   ├── crud.py
│   ├── database.py
│   ├── models.py
│   ├── routes.py
│   ├── .env
│   ├── requirements.txt
│   └── Dockerfile
├── frontend/
│   └── contact-book/
│       ├── src/
│       │   ├── App.js
│       │   └── components/
│       │       ├── ContactForm.jsx
│       │       └── ContactList.jsx
│       ├── Dockerfile
│       ├── package.json
│       └── yarn.lock
├── docker-compose.yaml
├── .gitignore
└── README.md
```

---

## 🚀 How to Run the App Locally

> No need to install Node, Python, or MongoDB — it's all handled via Docker.

### 1. 📦 Clone the Repository

```bash
git clone https://github.com/your-username/contact-app.git
cd contact_app
```

### 2. 🐳 Run with Docker Compose

```bash
docker-compose up --build
```

This will:

- Build and start the FastAPI backend at `http://localhost:8000`
- Build and start the React frontend at `http://localhost:3000`

### 3. 🧪 Test the App

Open your browser:

- **Frontend**: `http://localhost:3000`
- **Backend**: `http://localhost:8000/contacts`

---

## ⚙️ How the App Works

### 🎯 Backend (FastAPI)

- Defines routes at:
  - `POST /contacts`: Add a contact
  - `GET /contacts`: List all contacts
- Stores data in MongoDB
- Uses Pydantic for input validation

**Sample FastAPI app snippet**:

```python
@app.post("/contacts")
def add_contact(contact: Contact): ...
```

### 🧠 MongoDB

- Running locally or on your host machine
- **DB name**: `contact_db`
- **Collection**: `contacts`

Set in `.env`:

```ini
MONGO_URI=mongodb://host.docker.internal:27017
DB_NAME=contact_db
```

### 🖼 Frontend (React + Material UI)

- Form to add contact
- List view to display all contacts
- API calls via `axios` to the backend

---

## 📂 .gitignore Highlights

To avoid accidentally committing unnecessary files:

```bash
# Python
venv/
__pycache__/
.env

# Node
frontend/contact-book/node_modules/
frontend/contact-book/build/

# Docker
*.pid
*.bak

# OS & Editor
.DS_Store
.vscode/
.idea/
```

---

## 🔥 Docker Overview

### 📦 backend/Dockerfile

```dockerfile
FROM python:3.11

WORKDIR /app
COPY . .
RUN pip install --no-cache-dir -r requirements.txt

CMD ["uvicorn", "main:app", "--host", "0.0.0.0", "--port", "8000"]
```

### 📦 frontend/contact-book/Dockerfile

```dockerfile
FROM node:18

WORKDIR /app
COPY . .
RUN yarn install

EXPOSE 3000
CMD ["yarn", "start"]
```

### ⚙️ docker-compose.yaml

```yaml
version: '3'

services:
  backend:
    build: ./backend
    ports:
      - "8000:8000"
    volumes:
      - ./backend:/app
    environment:
      - MONGO_URI=mongodb://host.docker.internal:27017
      - DB_NAME=contact_db

  frontend:
    build: ./frontend/contact-book
    ports:
      - "3000:3000"
    depends_on:
      - backend
```

---

## 🛠️ Developer Notes

### 🐍 Virtual Environment (for local Python dev)

```bash
cd backend
python3 -m venv venv
source venv/bin/activate
pip install -r requirements.txt
```

### 💻 React Dev Mode (without Docker)

```bash
cd frontend/contact-book
yarn install
yarn start
```

### 👨‍💻 Contributing

1. Fork the repo
2. Create your feature branch: `git checkout -b feature/fooBar`
3. Commit changes: `git commit -am 'Add some feature'`
4. Push to branch: `git push origin feature/fooBar`
5. Open a pull request 🚀

---

## 📃 License

This project is licensed under the MIT License. See the `LICENSE` file for details.

---

## 🙋‍♂️ Questions?

Feel free to open an issue or pull request!