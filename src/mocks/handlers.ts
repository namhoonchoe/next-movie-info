import { http } from 'msw'
 
export const handlers = [
  http.get('/posts', () => {
    // Response resolver allows you to react to captured requests,
    // respond with mock responses or passthrough requests entirely.
    // For now, let's just print a message to the console.
    console.log('Captured a "GET /posts" request')
  }),
]
