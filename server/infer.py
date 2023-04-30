import tensorflow as tf
import numpy as np

class ASLInferrer:
    def __init__(self):
        self.tflite_path = 'asl.tflite'
        self.interpreter = tf.lite.Interpreter(model_path=self.tflite_path)
        self.interpreter.allocate_tensors()

        self.input_details = self.interpreter.get_input_details()
        self.output_details = self.interpreter.get_output_details()

    # Preprocesses the image
    def preprocess(self, image):
        # Normalizes the 2d array
        image = image / 255.0
        return image
    
    def infer(self, image=None):
        # Preprocesses the image
        image = self.preprocess(image)
        # Converts the image to a tensor
        image = tf.convert_to_tensor(image, dtype=tf.float32)
        
        # Reshapes the image
        image = tf.reshape(image, [1, 224, 224, 3])
        
        # Sets the input tensor for the interpreter
        self.interpreter.set_tensor(self.input_details[0]['index'], image)
        
        # Runs the inference
        self.interpreter.invoke()

        # Gets the prediction
        prediction = self.interpreter.get_tensor(self.output_details[0]['index'])

        # Get highest element in prediction
        percentage = prediction.max()
        # Gets the prediction
        prediction = prediction.argmax()
        return [int(prediction), float(percentage)]