from flask import Flask, render_template

app = Flask(__name__)

@app.route("/")
def home():
    return render_template("index.html")

@app.route("/prenotazioni")
def prenotazioni():
    return render_template("prenotazioni.html")

@app.route("/servizi")
def servizi():
    return render_template("servizi.html")

@app.route("/info")
def info():
    return render_template("info.html")

if __name__ == "__main__":
    app.run(debug=True)
