from fastapi import FastAPI
from settings import settings
from fastapi_mail import FastMail, MessageSchema, ConnectionConfig, MessageType
from pydantic import EmailStr, BaseModel
from starlette.responses import JSONResponse
from typing import List

class EmailSchema(BaseModel):
    email: List[EmailStr]

# class EmailSchema(BaseModel):
#     email: EmailStr
#     msg: str

conf = ConnectionConfig(
    MAIL_USERNAME = settings.mail_username,
    MAIL_PASSWORD = settings.mail_password,
    MAIL_FROM = settings.mail_from,
    MAIL_PORT = settings.mail_port,
    MAIL_SERVER = settings.mail_server,
    MAIL_FROM_NAME = settings.mail_from_name,
    MAIL_STARTTLS = settings.mail_starttls,
    MAIL_SSL_TLS = settings.mail_ssl_tls,
    USE_CREDENTIALS = settings.use_credentials,
    VALIDATE_CERTS = settings.validate_certs
)

app = FastAPI()

@app.get("/")
def root():
  return {"msg": "email"}

@app.post("/email")
# async def simple_send(model: EmailSchema) -> JSONResponse:
async def simple_send(email: EmailSchema) -> JSONResponse:
    # html = """<p>Hi this test mail, thanks for using Fastapi-mail</p> """
    html = f"""
            <h1>Email Server.</h1>
            <h1>ㄴㄴㄴㄴ</h1>
        """

    message = MessageSchema(
        subject="Fastapi-Mail module",
        # recipients=[model.email],
        recipients=email.dict().get("email"),
        body=html,
        subtype=MessageType.html)

    fm = FastMail(conf)
    await fm.send_message(message)
    return JSONResponse(status_code=200, content={"message": "email has been sent"})