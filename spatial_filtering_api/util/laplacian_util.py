import numpy as np
import cv2
import random

MAX_NO = 99999

def apply_laplacian_filter(img, filter):
    height = img.shape[0]
    width = img.shape[1]

    print(height , width)

    filterheight = filter.shape[0]
    filterwidth = filter.shape[1]

    if height < filterheight:
        print("height < filterhright, not proper filter")
        return 0

    #padded image dimension
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
    index = int(filterheight/2)
    print("middle value : ", filter[index, index])
    if filter[index, index] < 0:
        print("Setting mulby -1")
        mulby = -1
    else:
        print("Setting mulby 1")

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

    finalimag = img + mask
    return finalimag

def WriteImages(finalimag):

    no = random.randint(0, MAX_NO)
    print(no)
    name = "finalimg" + str(no) + ".jpg"
    print(name)

    cv2.imwrite(name, finalimag)

    print("Images are written to disk", name)


