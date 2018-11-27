import numpy as np
import cv2
import random

MAX_NO = 99999


def apply_laplacian_filter(img, filter, negmul=False):
    height = img.shape[0]
    width = img.shape[1]

    print(height, width)

    filterheight = filter.shape[0]
    filterwidth = filter.shape[1]

    #padded image

    startpoint = int(filterheight/2)
    endpoint = int(filterheight/2) * -1
    rowpadding = int(filterheight/2)*2
    colpadding = int(filterwidth/2)*2

    print("rowpadding : ", rowpadding, " colpadding : ", colpadding)

    img_out = np.ones((height + rowpadding, width + colpadding)) * 0
    img_out[startpoint:endpoint, startpoint:endpoint] = img

    #mask
    mask = np.ones((height, width)) * 0
    print(mask.shape[0] , mask.shape[1])

    mulby = 1
    if negmul == True:
        mulby = -1

    #print(img_out)
    for i in np.arange(0, height):
        for j in np.arange(0, width):
            sum = 0
            for k in np.arange(0, filterheight):
                for l in np.arange(0, filterwidth):
                    a = img_out.item(i + k, j + l)
                    w = filter[k, l]
                    sum = sum + (w * a)
            b = sum * mulby
            mask.itemset((i, j), b)

    print(i , j)
    return mask

def WriteImages(img, filter):
    final = img + filter
    #final = img_out
    no = random.randint(0, MAX_NO)
    print(no)
    name = "finalimg" + str(no) + ".jpg"
    filtername = "filter" + str(no) + ".jpg"

    print(name)

    cv2.imwrite(name, final)
    cv2.imwrite(filtername, filter)
    print("Images are written to disk", name, " & ", filtername)


