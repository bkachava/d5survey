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
Rent = Base.classes.rent

# Route to render index.html 
@app.route("/")
def home():
    return render_template("index.html")

# Query the database and send the jsonified results
@app.route("/send", methods=["GET", "POST"])
def send():
    if request.method == "POST":
        name = request.form["name"]
        optsexo = request.form["optsexo"]
        return redirect("/", code=302)

    return render_template("form.html")

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

# Query the database and send the jsonified results
@app.route("/rentByAge")
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

# Init app
if __name__ == "__main__":
    app.run()
