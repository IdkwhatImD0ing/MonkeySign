importScripts('https://cdn.jsdelivr.net/npm/@tensorflow/tfjs/dist/tf.min.js')
importScripts('aslInferrerWorker.js')

let modelLoaded = false

self.addEventListener('message', async (event) => {
  const {data} = event
  const {type, imageData, bbox} = data

  if (type === 'loadModel') {
    await self.loadModel()
    modelLoaded = true
    self.postMessage({status: 'modelLoaded'})
    return
  }

  tf.tidy(() => {
    const [x, y, width, height] = bbox

    // Convert the ImageData to a tensor
    const imageTensor = tf.browser.fromPixels(imageData)

    // Slice the tensor based on the bounding box coordinates
    const croppedTensor = imageTensor.slice(
      [Math.round(y), Math.round(x), 0],
      [Math.round(height), Math.round(width), 3],
    )

    // Resize the tensor to 224x224
    const resizedTensor = tf.image.resizeBilinear(croppedTensor, [224, 224])

    // Reshape the tensor to 1x224x224x3
    const reshapedTensor = resizedTensor.expandDims(0)

    // Run the inference task in the worker
    self.infer(reshapedTensor).then((prediction) => {
      // Return the results
      self.postMessage({status: 'success', prediction})
    })
  })
})
