import * as tf from '@tensorflow/tfjs'

const preprocess = (image) => {
  const imageTensor = tf.browser.fromPixels(image)
  //Print the shape of the image tensor
  return imageTensor
}

class ASLInferrer {
  constructor() {
    this.model = null
  }

  async loadModel() {
    const modelUrl = '/asl_js/model.json'
    this.model = await tf.loadGraphModel(modelUrl)
  }

  async infer(image = null) {
    return new Promise(async (resolve) => {
      // Preprocess the image
      const preprocessedImage = preprocess(image)
      // Resize to 224, 224
      let resizedImage = tf.image.resizeBilinear(preprocessedImage, [224, 224])

      // Add a dimension to get a batch shape
      resizedImage = tf.tensor4d(
        Array.from(resizedImage.dataSync()),
        [1, 224, 224, 3],
        'float32',
      )

      // Runs the inference
      const prediction = this.model.execute(resizedImage)

      const array = await prediction.data()
      const predictionIndex = array.indexOf(Math.max(...array))
      const percentage = Math.max(...array) * 100
      resolve([predictionIndex, percentage])
    })
  }
}

export default ASLInferrer
