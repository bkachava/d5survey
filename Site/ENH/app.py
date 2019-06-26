# Se importan las dependencias
import os
from flask import Flask, render_template, jsonify, request, redirect

# Se instancia la aplicación 
app = Flask(__name__)

#################################################
# Database Setup
#################################################

app.config['SQLALCHEMY_DATABASE_URI'] = os.environ.get("DATABASE_URL","") or "sqlite:///db/ETH.sqlite"

# Crea la ruta para renderiar el template index.html 
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

# Se inicializa la app
if __name__ == "__main__":
    app.run()
