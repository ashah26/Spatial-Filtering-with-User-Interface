import numpy as np


def linear_filter(input_image, filter):
    height = input_image.shape[0]
    width = input_image.shape[1]
    total = sum(sum(filter))
    #print(height, width)

    filterheight = filter.shape[0]
    filterwidth = filter.shape[1]

    # padded image

    startpoint = int(filterheight / 2)
    endpoint = int(filterheight / 2) * -1
    rowpadding = int(filterheight / 2) * 2
    colpadding = int(filterwidth / 2) * 2

    #print("rowpadding : ", rowpadding, " colpadding : ", colpadding)

    large_image = np.zeros((height + rowpadding, width + colpadding))
    large_image[startpoint:endpoint, startpoint:endpoint] = input_image
    img_out = np.zeros((height, width))

    for i in range(rowpadding, large_image.shape[0]-rowpadding):
        for j in range(colpadding, large_image.shape[1]-colpadding):
            s = 0
            for k in range(filter.shape[0]):
                for l in range(filter.shape[1]):
                    y = k-1
                    x = l-1
                    s += filter[k][l] * large_image[i+y][j+x]
            img_out[i-1][j-1] = s/total
    return img_out
