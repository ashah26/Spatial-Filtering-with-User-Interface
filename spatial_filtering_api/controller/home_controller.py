from flask import request, Response, Blueprint, json
import traceback

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
    try:
        print("Request perform filter: ", request.json)
        status, res_body = home_service.perform_filter(request.json)
        if status == 1:
            return Response(json.dumps(res_body), status=200)
        return Response(status=404)
    except Exception:
        print("Error while performing filter:\n{}".format(traceback.format_exc()))


@home.route("/filter", methods=["GET"])
def fetch_data():
    print("In fetch value pycharm::")
    filter_dict = {
        "Image Smoothing": {
            "Linear Filter": [
                {'id': 1, 'mask': [[0.11, 0.11, 0.11], [0.11, 0.11, 0.11], [0.11, 0.11, 0.11]]},
                {'id': 2, 'mask': [[0.06, 0.12, 0.06], [0.12, 0.25, 0.12], [0.06, 0.12, 0.06]]}
            ],
            "Non-Linear Median Filter": [
                {'id': 13, 'mask': [[3*3], [5*5], ]},
                {}
            ]
        },
        "Image Sharpening": {
            "Laplacian Filter": [
                {'id': 3, 'mask': [[0, 1, 0], [1, -4, 1], [0, 1, 0]]},
                {'id': 4, 'mask': [[1, 1, 1], [1, -8, 1], [1, 1, 1]]},
                {'id': 5, 'mask': [[0, -1, 0], [1, 4, 1], [0, -1, 0]]},
                {'id': 6, 'mask': [[-1, -1, -1], [-1, 8, -1], [-1, -1, -1]]}
            ],
            "First Order Derivative Filter": [
                {'id': 7, 'mask': [[1, 0, -1], [1, 0, -1], [1, 0, -1]], 'name': 'Prewitt', 'weight': 0},
                # {'id': 8, 'mask': [[1, 1, 1], [0, 0, 0], [-1, -1, -1]], 'name': 'Prewitt', 'weight': 0},
                {'id': 9, 'mask': [[1, 0, -1], [2, 0, -2], [1, 0, -1]], 'name': 'Sobel', 'weight': 2},
                # {'id': 10, 'mask': [[1, 2, 1], [0, 0, 0], [-1, -2, -1]], 'name': 'Sobel', 'weight': 2},
                {'id': 11, 'mask': [[0, 1], [-1, 0]], 'name': 'Roberts', 'weight': 0}
                # {'id': 12, 'mask': [[1, 0], [0, -1]], 'name': 'Roberts', 'weight': 0}
            ],
            "Unsharp Mask Filter": [
                {'id': 11, 'mask': [[0.11, 0.11, 0.11], [0.11, 0.11, 0.11], [0.11, 0.11, 0.11]], 'k': 5},
                {'id': 12, 'mask': [[0.06, 0.12, 0.06], [0.12, 0.25, 0.12],
                                                      [0.06, 0.12, 0.06]], 'k': 5}
            ]
        }}
    return Response(json.dumps(filter_dict), status=200, mimetype="application/json")
