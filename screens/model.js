import * as tf from '@tensorflow/tfjs';
import '@tensorflow/tfjs-react-native';

// Define the path to your .h5 model file
const modelPath = 'model\bestmodel (1).keras';

// Load the model
async function loadModel() {
  const model = await tf.loadLayersModel(`file://${bestmodel (1).keras}`);
  return model;
}

// Perform inference
async function predict(inputData) {
  const model = await loadModel();
  
  // Preprocess input data if needed
  const inputTensor = tf.tensor2d(inputData, [1, inputData.length]);

  // Perform prediction
  const output = model.predict(inputTensor);

  // Convert the output to JavaScript array
  const prediction = output.dataSync();

  // Cleanup
  inputTensor.dispose();
  output.dispose();
  model.dispose();

  return prediction;
}

// Example usage
const inputData = [/* Your input data here */];
predict(inputData)
  .then(prediction => {
    console.log('Prediction:', prediction);
  })
  .catch(error => {
    console.error('Error:', error);
  });