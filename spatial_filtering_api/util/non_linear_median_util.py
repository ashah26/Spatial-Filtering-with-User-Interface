import numpy as np
import cv2

def apply_median(input_image, size):
    height, width = input_image.shape
    #padded Image
    padding = size-1
    stpt = int(padding/2)
    large_image = np.zeros((height+padding, width+padding))
    large_image[stpt:height+stpt, stpt:width+stpt] = input_image
    img_out = np.zeros((height, width))
    for i in range(stpt, height+stpt):
        for j in range(stpt, width+stpt):
            s = []
            for k in range(size):
                for l in range(size):
                    y = k - stpt
                    x = l - stpt
                    s.append(large_image[i+y][j+x])
            s.sort()
            index = int(size*size/2)
            img_out[i-stpt][j-stpt] = s[index]
    return img_out

