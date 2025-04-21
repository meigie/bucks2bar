from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
import smtplib
from email.mime.text import MIMEText
from email.mime.multipart import MIMEMultipart
from email.mime.base import MIMEBase
from email import encoders
import base64

app = FastAPI()

# CORS middleware to allow requests from the frontend
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Adjust this to your frontend URL
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

class EmailRequest(BaseModel):
    email: str
    image: str

@app.post("/send-email")
async def send_email(request: EmailRequest):
    email = request.email
    image = request.image
    print("SEND EMAIL WORKS", {"email": email, "image": image})

    # SMTP server configuration
    smtp_host = "smtp.resend.com"
    smtp_port = 587
    smtp_user = "resend"
    smtp_pass = "re_iaTedeVX_DbQHqnd6r57zQf9oWWU6qo4f"

    # Create the email
    msg = MIMEMultipart()
    msg['From'] = "test@resend.dev"
    msg['To'] = email
    msg['Subject'] = "Your Chart Image"

    # Email body
    msg.attach(MIMEText("Please find your chart image attached.", 'plain'))

    # Decode the base64 image and attach it
    try:
        image_data = base64.b64decode(image.split("base64,")[1])
        attachment = MIMEBase('application', 'octet-stream')
        attachment.set_payload(image_data)
        encoders.encode_base64(attachment)
        attachment.add_header('Content-Disposition', 'attachment', filename="chart.png")
        msg.attach(attachment)
    except Exception as e:
        print({"error": str(e)})
        raise HTTPException(status_code=500, detail="Failed to process the image")

    # Send the email
    try:
        with smtplib.SMTP(smtp_host, smtp_port) as server:
            server.starttls()
            server.login(smtp_user, smtp_pass)
            server.sendmail(msg['From'], msg['To'], msg.as_string())
        return {"message": "Email sent successfully!"}
    except Exception as e:
        print({"error": str(e)})
        raise HTTPException(status_code=500, detail="Failed to send email")

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="localhost", port=3000)