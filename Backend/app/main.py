# from fastapi import FastAPI
# from fastapi.middleware.cors import CORSMiddleware

# from app.core.config import settings


# app = FastAPI(
#     title=settings.PROJECT_NAME,
#     openapi_url=f"{settings.API_V1_STR}/openapi.json",
#     docs_url=f"{settings.API_V1_STR}/docs",
#     redoc_url=None,
#     version="0.1.0",
# )

# if settings.BACKEND_CORS_ORIGINS:
#     app.add_middleware(
#         CORSMiddleware,
#         allow_origins=[str(origin) for origin in settings.BACKEND_CORS_ORIGINS],
#         allow_credentials=True,
#         allow_methods=["*"],
#         allow_headers=["*"],
#     )



#For testing
from flask import Flask
import datetime
from flask_cors import CORS
x = datetime.datetime.now()

# Initializing flask app
app = Flask(__name__)
CORS(app)
# Route for seeing a data
@app.route('/data')
def get_time():

    # Returning an api for showing in  reactjs
    return {
        'Name':"geek",
        "Age":"22",
        "Date":x,
        "programming":"python"
        }


# Running app
if __name__ == '__main__':
    app.run(port=3001,debug=True)