import numpy as np

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

    sharp_image = input_image + k * mask
    '''minimum = sharp_image.min()
    maximum = sharp_image.max()
    for i in range(sharp_image.shape[0]):
	for j in range(sharp_image.shape[1]):
	    sharp_image[i,j] = (sharp_image[i,j]-minimum) * 255/(maximum - minimum)'''
    return sharp_image

def apply_unsharp_masking(input_image, filter, k):
    smooth_image = linear_filter(input_image, filter)
    sharp_image = Sharpen(input_image, smooth_image, k)
    return sharp_image
