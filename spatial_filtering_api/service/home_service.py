import base64
from datetime import datetime
import traceback


class HomeService:
    # def __init__(self):
    #     pass

    def perform_filter(self, request_params):
        status = 0
        res_body = {
            'filtered_image': "",
            'msg': 'Error'
        }
        try:
            print(request_params['original_image'][:30])
            image = request_params["original_image"]
            image_data = base64.b64decode(image[image.index(',') + 1:])
            print(image_data[:20])
            file_name = "original_{}".format(datetime.now().strftime("%y_%m_%d-%H:%M:%S")+".jpg")
            with open(file_name, 'wb') as f:
                f.write(image_data)



            # Filtered Image base64 encoded
            filtered_image = ""
            res_body = {
                'filtered_image': 'data:image/png;base64, ' + filtered_image,
                'msg': 'success'
            }
            status = 1
        except Exception:
            print("Error while applying filter:\n{}".format(traceback.format_exc()))
        return status, res_body
