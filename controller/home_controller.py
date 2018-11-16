from flask import Flask, request, Response, Blueprint, json
from flask import jsonify, render_template

home = Blueprint('home_controller', __name__,
                   template_folder="templates",
                   static_folder="static",
                   static_url_path="/static")


@home.route("/status", methods=["GET"])
def check_health():
    msg = {'Message': 'Hello, spatial filtering'}
    return Response(json.dumps(msg), status=200, mimetype='application/json')


@home.route("/", methods=["GET"])
def load_home():
    return render_template("index.html", name="ashna")
