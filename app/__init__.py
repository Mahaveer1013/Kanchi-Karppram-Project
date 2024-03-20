from flask import Flask
from flask_sqlalchemy import SQLAlchemy
from flask_login import LoginManager
from flask_socketio import SocketIO
import os
import logging

from sqlalchemy import create_engine

# Initialize SQLAlchemy
db = SQLAlchemy()
DB_NAME = "database.db"

mysql_engine = None
sqlite_engine = None

# Create a socketio instance without initializing it
socketio = SocketIO()

# Factory function to create the Flask app
def create_app():
    global mysql_engine, sqlite_engine  # Declare as global to use them inside the function
    
    app = Flask(__name__, static_folder='static')
    
    # Configure the app
    app.config['SECRET_KEY'] = '#$&^&^WYYDUHS&YWE'
    db_path = os.path.abspath(os.path.dirname(__file__))
    app.config['SQLALCHEMY_DATABASE_URI'] = f'sqlite:///{os.path.join(db_path, DB_NAME)}'
    app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False

    # Define paths for file uploads
    UPLOAD_FOLDER = os.path.join(app.root_path, 'static/img/profile')
    app.config['UPLOAD_FOLDER'] = UPLOAD_FOLDER
    EXCEL_FOLDER = os.path.join(app.root_path, 'static/excel')
    app.config['EXCEL_FOLDER'] = EXCEL_FOLDER
    DAY_ATTENDANCE_FOLDER = os.path.join(app.root_path, 'static\XLfile')
    app.config['DAY_ATTENDANCE_FOLDER'] = DAY_ATTENDANCE_FOLDER

    app.config['MAIL_SERVER'] = 'smtp.gmail.com'
    app.config['MAIL_PORT'] = 465
    app.config['MAIL_USE_SSL'] = True
    app.config['MYSQL_HOST'] = '192.168.137.173'
    # app.config['MYSQL_HOST'] = 'localhost'
    # app.config['MYSQL_USER'] = 'mahaveer'
    # app.config['MYSQL_PASSWORD'] = '#Mahaveer1234'
    # app.config['MYSQL_DB'] = 'server'
    app.config['MYSQL_USER'] = 'jacky'
    app.config['MYSQL_PASSWORD'] = 'jacky123'
    app.config['MYSQL_DB'] = 'server'
    

    from . import models
    from .models import Attendance,Emp_login
    models.db.init_app(app)
    login_manager = LoginManager()
    login_manager.login_view = 'auth.login'
    login_manager.init_app(app)
    @login_manager.user_loader
    def load_user(user_id):
        return Emp_login.query.get(int(user_id))
    # Create the database if it doesn't exist

    # Define the engines
    mysql_engine = create_engine(
        f"mysql://{app.config['MYSQL_USER']}:{app.config['MYSQL_PASSWORD']}@{app.config['MYSQL_HOST']}/{app.config['MYSQL_DB']}",
        echo=True
    )
    sqlite_engine = create_engine(f'sqlite:///{os.path.join(db_path, DB_NAME)}', echo=True)

    # Bind the models to engines
    Attendance.metadata.bind = mysql_engine

    # Import and register blueprints
    from .auth import auth
    from .views import views
    app.register_blueprint(views, url_prefix='/')
    app.register_blueprint(auth, url_prefix='/')

    # Mail configuration
    socketio.init_app(app)
    create_database(app)


    return app

# Function to create the database if it doesn't exist
def create_database(app):
    if not os.path.exists(os.path.join(app.instance_path, DB_NAME)):
        with app.app_context():
            db.create_all()
        print('Created Database!')
# from flask import Flask,session
# from flask_sqlalchemy import SQLAlchemy
# from flask_login import LoginManager
# from flask_socketio import SocketIO
# import os

# import pytz
# from datetime import datetime
# from sqlalchemy import create_engine
# from sqlalchemy.orm import sessionmaker

# # Initialize SQLAlchemy
# db = SQLAlchemy()
# DB_NAME = "database.db"

# # Create a socketio instance without initializing it
# socketio = SocketIO()

# # Factory function to create the Flask app
# def create_app():
#     global mysql_engine, sqlite_engine 
#     app = Flask(__name__, static_folder='static')

    
    
#     # Configure the app
#     app.config['SECRET_KEY'] = '#$&^&^WYYDUHS&YWE'
#     db_path = os.path.abspath(os.path.dirname(__file__))
#     app.config['SQLALCHEMY_DATABASE_URI'] = f'sqlite:///{os.path.join(db_path, DB_NAME)}'
#     app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False

#     # Define paths for file uploads
#     UPLOAD_FOLDER = os.path.join(app.root_path, 'static/img/profile')
#     app.config['UPLOAD_FOLDER'] = UPLOAD_FOLDER
#     EXCEL_FOLDER = os.path.join(app.root_path, 'static\excel')
#     app.config['EXCEL_FOLDER'] = EXCEL_FOLDER
#     DAY_ATTENDANCE_FOLDER = os.path.join(app.root_path, 'static\XLfile')
#     app.config['DAY_ATTENDANCE_FOLDER'] = DAY_ATTENDANCE_FOLDER
    
#     # print(EXCEL_FOLDER)

#     # Initialize SQLAlchemy with the app
#     db.init_app(app)
#     # Initialize LoginManager
#     login_manager = LoginManager()
#     login_manager.login_view = 'auth.login'
#     login_manager.init_app(app)
#     from . import models
#     from .models import Attendance,Emp_login
#     models.db.init_app(app)
#     # User loader callback for LoginManager
#     @login_manager.user_loader
#     def load_user(id):
#         return Emp_login.query.get(int(id))

#     # Import and register blueprints
#     from .auth import auth
#     from .views import views
#     app.register_blueprint(views, url_prefix='/')
#     app.register_blueprint(auth, url_prefix='/')

#     # Mail configuration
#     app.config['MAIL_SERVER'] = 'smtp.gmail.com'
#     app.config['MAIL_PORT'] = 465
#     app.config['MAIL_USE_SSL'] = True

#     app.config['MYSQL_HOST'] = '192.168.137.199'
#     app.config['MYSQL_USER'] = 'sabari'
#     app.config['MYSQL_PASSWORD'] = '12345678'
#     app.config['MYSQL_DB'] = 'server'

#     # Import and initialize Flask-SocketIO with the app
#     socketio.init_app(app)

#     mysql_engine = create_engine(
#         f"mysql://{app.config['MYSQL_USER']}:{app.config['MYSQL_PASSWORD']}@{app.config['MYSQL_HOST']}/{app.config['MYSQL_DB']}",
#         echo=True
#     )
#     sqlite_engine = create_engine(f'sqlite:///{os.path.join(db_path, DB_NAME)}', echo=True)

#     # Bind the models to engines
#     Attendance.metadata.bind = mysql_engine

#     # Create the database if it doesn't exist
#     create_database(app)

#     return app


# # Function to create the database if it doesn't exist
# def create_database(app):
#     if not os.path.exists(os.path.join(app.instance_path, DB_NAME)):
#         with app.app_context():
#             db.create_all()
#         print('Created Database!')

