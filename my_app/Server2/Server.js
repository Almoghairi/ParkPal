import app from './VQServer.js';

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
  console.log(`Available endpoints:`);
  console.log(`- POST http://localhost:${PORT}/api/vq/join`);
  console.log(`- GET http://localhost:${PORT}/api/vq/status/:token`);
  console.log(`- GET http://localhost:${PORT}/api/vq/all`);
});



app.get('/', (req, res) => {
  res.send('Welcome to Theme Park Virtual Queue System!');
});



