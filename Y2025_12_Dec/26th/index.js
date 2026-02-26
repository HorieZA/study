import { createServer } from 'node:http';
import Main from './main.js';

const server = createServer(Main);

server.listen(3000, "127.0.0.1", () => {
  console.log('Listening on 127.0.0.1:3000');
});
