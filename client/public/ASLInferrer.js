importScripts('https://cdn.jsdelivr.net/npm/@tensorflow/tfjs/dist/tf.min.js')

class ASLInferrer {
  constructor() {
    this.model = null
  }

  async loadModel() {
    const modelUrl = '/asl_js/model.json'
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

self.ASLInferrer = ASLInferrer
