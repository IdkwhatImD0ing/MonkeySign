importScripts('ASLInferrer.js')

const aslInferrer = new self.ASLInferrer()

async function loadModel() {
  await aslInferrer.loadModel()
}

async function infer(tensor) {
  return await aslInferrer.infer(tensor)
}

self.loadModel = loadModel
self.infer = infer
