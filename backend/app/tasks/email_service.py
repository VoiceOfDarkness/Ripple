import smtplib
from email.mime.multipart import MIMEMultipart
from email.mime.text import MIMEText

from app.core.config import settings
from celery import Celery
from jinja2 import Environment, FileSystemLoader

celery = Celery(
    "tasks.email_service",
    broker=f"redis://{settings.REDIS_HOST}:{settings.REDIS_PORT}/{settings.REDIS_DB}",
)


@celery.task(name="tasks.email_service.send_verification_code") 
def send_verification_code(email: str, code: str) -> None:
    env = Environment(loader=FileSystemLoader('app'))
    template = env.get_template('templates/email_code.html')
    html_content = template.render(code=code)
    
    msg = MIMEMultipart()
    msg["From"] = settings.SMTP_USER
    msg["To"] = email
    msg["Subject"] = "Verification Code"
    msg.attach(MIMEText(f"Your verification code is: {code}", "plain"))
    msg.attach(MIMEText(html_content, "html"))

    server = smtplib.SMTP(settings.SMTP_SERVER, settings.SMTP_PORT)
    server.starttls()
    server.login(settings.SMTP_USER, settings.SMTP_PASSWORD)
    server.send_message(msg)
    server.quit()
