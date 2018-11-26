from flask import request, Response, Blueprint, json
from service.home_service import HomeService
home = Blueprint('home_controller', __name__)
home_service = HomeService()


@home.route("/", methods=["GET"])
def check_status():
    msg = {'Message': 'Hello, spatial filtering'}
    return Response(json.dumps(msg), status=200, mimetype='application/json')


@home.route("/health", methods=["GET"])
def check_health():
    msg = {'Message': 'Hello, health ok'}
    return Response(json.dumps(msg), status=200, mimetype='application/json')


@home.route("/filter",methods=["POST"])
def perform_filter():
    print("Request perform filter: ", request.json)
    status, res_body = home_service.perform_filter(request.json)
    if status == 1:
        return Response(json.dumps(res_body), status=200)
    return Response(status=404)


@home.route("/filter", methods=["GET"])
def fetch_data():
    print("In fetch value pycharm::")
    filter_dict = {
        "Image Smoothing": {
            "Linear Filter": [
                ['1/9', [[1, 1, 1], [1, 1, 1], [1, 1, 1]]],
                ['1/16', [[1, 2, 1], [2, 4, 2], [1, 2, 1]]]
            ],
            "Non-Linear Filter": [
                [0, []]
            ]
        },
        "Image Sharpening": {
            "Laplacian Filter": [
                ['0', [[0, 1, 0], [1, -4, 1], [0, 1, 0]]],
                ['0', [[1, 1, 1], [1, -8, 1], [1, 1, 1]]],
                ['0', [[0, -1, 0], [1, 4, 1], [0, -1, 0]]],
                ['0', [[-1, -1, -1], [-1, 8, -1], [-1, -1, -1]]]
            ],
            "First Order Derivative Filter": [
                [5, []]
            ],
            "Unsharp Mask Filter": [
                [6,[]]
            ]
        }}
    return Response(json.dumps(filter_dict), status=200, mimetype="application/json")
