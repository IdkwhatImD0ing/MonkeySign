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
    const modelUrl = '/aslQuantized/model.json'
    this.model = await tf.loadGraphModel(modelUrl)
  }

  async infer(tensor) {
    return new Promise(async (resolve) => {
      // Runs the inference
      const prediction = this.model.execute(tensor)

      const array = await prediction.data()
      const predictionIndex = array.indexOf(Math.max(...array))
      const percentage = Math.max(...array) * 100
      resolve([predictionIndex, percentage])
    })
  }
}

export default ASLInferrer
