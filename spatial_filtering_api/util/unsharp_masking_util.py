
import numpy as np

def Smooth(input_image, filter):
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

def Sharpen(input_image, smooth_image, k):
    #mask = input_image - smooth_image
    h, w = input_image.shape
    mask = np.zeros((h,w))
    for i in range(h):
        for j in range(w):
            inp = input_image[i][j]
            s = smooth_image[i][j]
            if inp < s:
                mask[i][j] = 0
            else:
                mask[i][j] = inp - s
            #print(input_image[i][j])
            #print(smooth_image[i][j])
            #print(mask[i][j])

    '''sharp_image = np.zeros((h,w))
    for i in range(h):
        for j in range(w):
            inp = input_image[i][j]
            m = mask[i][j]
            tmp = inp + k * m
            if tmp > 255:
                sharp_image[i][j] = 255
            else:
                sharp_image[i][j] = tmp'''
    sharp_image = input_image + k * mask
    '''minimum = sharp_image.min()
    maximum = sharp_image.max()
    for i in range(sharp_image.shape[0]):
	for j in range(sharp_image.shape[1]):
	    sharp_image[i,j] = (sharp_image[i,j]-minimum) * 255/(maximum - minimum)'''
    return sharp_image, mask

def apply_unsharp_masking(input_image, filter, k):
    smooth_image = Smooth(input_image, filter)
    sharp_image, mask= Sharpen(input_image, smooth_image, k)
    return sharp_image
