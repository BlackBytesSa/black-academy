import { onRequest, onCall } from 'firebase-functions/v2/https'

const callableOptions = {
  region: 'europe-west3',
}

export const helloWorld = onRequest(callableOptions, (request, response) => {
  response.send('Hello from Firebase!')
})

export const getHelloWorld = onCall(callableOptions, () => {
  return 'Hello from Firebase!'
})
