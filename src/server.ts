import app from './app';
import connectDB from './config/db';
import dotenv from 'dotenv';
dotenv.config();

connectDB();

const PORT = process.env.PORT || 5000;
const server = app.listen(PORT, () => {
  console.log(` Serveur démarré sur http://localhost:${PORT}`);
});

process.on('unhandledRejection', (err: Error) => {
  console.error(` Erreur non gérée : ${err.message}`);
  server.close(() => process.exit(1));
});