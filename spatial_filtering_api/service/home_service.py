import base64
from datetime import datetime
import traceback
import os
import cv2
import numpy as np

from util.laplacian_util import apply_laplacian_filter
from util.unsharp_masking_util import apply_unsharp_masking
from util.linear_filter_util import linear_filter
# from util.first_order_derivative import first_order_derivative


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
            # print(request_params['original_image'][:30])

            # Getting image from user
            image = request_params["original_image"]

            # Decoding image_base64 string
            image_data = base64.b64decode(image[image.index(',') + 1:])
            # print(image_data[:20])

            # Create directory if it does not exist
            file_path = "../output"
            if not os.path.exists(file_path):
                os.makedirs(file_path)

            # Getting time to append to file name
            file_creation_time = datetime.now().strftime("%y_%m_%d-%H:%M:%S")

            # Creating original image file name
            original_image_name = "{}/original_{}.jpg".format(file_path, file_creation_time)

            # Writing the image received from user on file system
            with open(original_image_name, 'wb') as f:
                f.write(image_data)

            # reading image and converting it to matrix using cv2
            original_image = cv2.imread(original_image_name, 0)

            # Creating filtered image name
            filtered_image_name = "{}/filtered_{}.jpg".format(file_path,file_creation_time)

            filtered_image = ""

            # pass the original image and mask to different filters
            if request_params['filter'] == 'Laplacian Filter':
                filtered_image = apply_laplacian_filter(original_image,
                                                        np.array(request_params['mask_dict']['mask']))
            elif request_params['filter'] == 'Unsharp Mask Filter':
                filtered_image = apply_unsharp_masking(original_image,
                                                       np.array(request_params['mask_dict']['mask']),
                                                       request_params['mask_dict']['k'])
            elif request_params['filter'] == 'Linear Filter':
                filtered_image = linear_filter(original_image,
                                               np.array(request_params['mask_dict']['mask']))
            # elif request_params['filter'] == 'First Order Derivative Filter':
            #     filtered_image = first_order_derivative(original_image,
            #                                             request_params['mask_dict']['name'])
            else:
                print("Filter selection does not match")

            # Writing filtered image matrix to file system
            cv2.imwrite(filtered_image_name, filtered_image)


            # Filtered Image base64 encoded
            filtered_image = ""

            # Reading filtered image and converting it to base64 to display
            with open(filtered_image_name, "rb") as f:
                filtered_image = base64.b64encode(f.read()).decode('utf-8')

            # print(type(filtered_image))
            # print(filtered_image[:30])

            if filtered_image:
                res_body = {
                    'filtered_image': 'data:image/jpeg;base64, ' + filtered_image,

                    'msg': 'success'
                }

                status = 1
        except Exception:
            print("Error while applying filter:\n{}".format(traceback.format_exc()))
        return status, res_body
