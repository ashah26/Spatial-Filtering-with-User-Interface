# Spatial Filtering

## API
### install python3
### create virtual environment
python3 -m venv venv3

### Following ways of executing API Server:
1) sh run.sh (Executes API Server)

2) - source ~/venv3/bin/activate  (activates virtual environment)
   - pip install -r requirement.txt (install dependent libraries in virtual environment)
   - python app.py (Executes API Server)

## UI
### Install Node and npm
https://www.npmjs.com/get-npm

### to Install dependencies mentioned in package.json
npm install 

### Run Front-End Server
npm start

## Steps to perform to get filtered image
Step 1: Select Image Smoothing / Image Sharpening

Step 2: Accordingly select filters 
        
        Smoothing - Linear, Non-Linear
        Sharpening - First order derivative, Laplacian, Unsharp masking and boost

Step 3: Select mask for the filter.
    
    There are some suggested masks for each filter and there is provision to enter custom filter for user in various sizes as 3*3, 5*5 and 7*7

Step 4: Browse the image and upload it

Step 5: Click Apply filter to see desired output image

Step 6: You can also download the filtered(output) image
