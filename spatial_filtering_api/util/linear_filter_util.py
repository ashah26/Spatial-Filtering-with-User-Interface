import numpy as np
#import cv2

def linear_filter(input_image, filter):
    height = input_image.shape[0]
    width = input_image.shape[1]
    total = sum(sum(filter))
    #print(height, width)

    filterheight = filter.shape[0]
    filterwidth = filter.shape[1]

    # padded image
    rowpadding = int(filterheight / 2) * 2
    colpadding = int(filterwidth / 2) * 2
    rowmargin = int(rowpadding/2)
    colmargin = int(colpadding / 2)

    large_image = np.zeros((height + rowpadding, width + colpadding))
    large_image[rowmargin:height + rowmargin, colmargin:width + colmargin] = input_image
    img_out = np.zeros((height, width))

    for i in range(rowmargin, large_image.shape[0]-rowmargin):
        for j in range(colmargin, large_image.shape[1]-colmargin):
            s = 0
            for k in range(filterheight):
                for l in range(filterwidth):
                    y = k-rowmargin
                    x = l-colmargin
                    s += filter[k][l] * large_image[i+y][j+x]
            img_out[i-rowmargin][j-colmargin] = s/total
    return img_out
