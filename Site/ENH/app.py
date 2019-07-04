# Se importan las dependencias
import os
import sqlalchemy
from sqlalchemy.orm import Session
from sqlalchemy import create_engine
from sqlalchemy.ext.automap import automap_base
from flask import Flask, render_template, jsonify, request, redirect
from flask_sqlalchemy import SQLAlchemy


# Flask Setup 
app = Flask(__name__)

#################################################
# Database Setup
#################################################

app.config['SQLALCHEMY_DATABASE_URI'] = os.environ.get("DATABASE_URL","") or "sqlite:///db/enh.sqlite"
db = SQLAlchemy(app)

# Reflect database into a new model
Base = automap_base()

# Reflect the tables
Base.prepare(db.engine, reflect=True)

# Save references to each table
Services = Base.classes.services
Stservices = Base.classes.stservices
Rent = Base.classes.rent
Gender = Base.classes.gender

# Route to render index.html 
@app.route("/")
def home():
    return render_template("index.html")


# Route to render services.html 
@app.route("/service")
def servpage():
    return render_template("services.html")


# Route to render rent.html 
@app.route("/rent")
def rentpage():
    return render_template("rent.html")


# Route to render map.html 
@app.route("/map")
def mappage():
    return render_template("map.html")


# Route to render literacy.html 
@app.route("/gender")
def litpage():
    return render_template("literacy.html")


@app.route("/services/<level>")
def services(level):
    """Return the services for a given socioeconomic level."""
    sel = [
        Services.item,
        Services.total,
        Services.yes_cnt,
        Services.no_cnt
   ]
   # Query the table with filter
    results = db.session.query(*sel).filter(Services.level == level).all()

    # Create a  list entry for each row
    serv_list = []
    for result in results:
        service_data = {
            "item" : result[0],
            "total" : result[1],
            "yes_cnt" : result[2],
            "no_cnt" : result[3]
        }
        serv_list.append(service_data)

    return jsonify(serv_list)


@app.route("/servicesByState/<level>")
def stateservices(level):
    """Return the services for a given socioeconomic level."""
    sel = [
        Stservices.level,
        Stservices.services,
        Stservices.state,
        Stservices.yes_cnt
       ]
    # Query the table with filter
    if level == 'c':
        results = db.session.query(*sel).all()
    else:
        results = db.session.query(*sel).filter(Stservices.level == level).all()

    # Create a  list entry for each row
    serv_list = []
    for result in results:
        service_data = {
            "Level" : result[0],
            "Services" : result[1],
            "State" : result[2],
            "Yes Counter" : result[3]
        }
        serv_list.append(service_data)

    return jsonify(serv_list)


# Query the database and send the jsonified results
@app.route("/rent/ByAge")
def rentByAge():
    """Return the rent by age."""
    sel = [
        Rent.folioviv,
        Rent.tenencia,
        Rent.pago_renta,
        Rent.est_socio,
        Rent.edad,
        Rent.parentesco
   ]
    # Query the table with filter
    results = db.session.query(*sel).all()

    # Create a  list entry for each row
    rent_list = []
    for result in results:
        rent_data = {
            "folioviv" : result[0],
            "tenencia" : result[1],
            "pago_renta" : result[2],
            "est_socio" : result[3],
            "edad" : result[4],
            "parentesco" : result[5]
        }
        rent_list.append(rent_data)

    return jsonify(rent_list)

# Query the database and send the jsonified results for Gender
@app.route("/gender/ByState")
def genByState():
    """Return the gender by state."""
    sel = [
        Gender.state,
        Gender.group,
        Gender.axis,
        Gender.value,
        Gender.description
   ]
    # Query the table with filter
    results = db.session.query(*sel).all()

    # Create a  list entry for each row
    gender_list = []
    for result in results:
        gender_data = {
            "state" : result[0],
            "group" : result[1],
            "axis" : result[2],
            "value" : result[3],
            "description" : result[4],
        }
        gender_list.append(gender_data)

    return jsonify(gender_list)

# Init app
if __name__ == "__main__":
    app.run()
