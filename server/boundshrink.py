#audrey insert
import cv2
import numpy as np

def crop_and_resize(image, bbox, target_size=(224, 224)):
    x, y, w, h = bbox
    cropped_image = image[y:y+h, x:x+w]
    resized_image = cv2.resize(cropped_image, target_size)
    return resized_image

#audrey finish insert