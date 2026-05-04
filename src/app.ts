import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import cookieParser from 'cookie-parser';
//import rateLimit from 'express-rate-limit';
import swaggerUi from 'swagger-ui-express';
import { swaggerDocument } from './config/swagger';
import v1Routes from './routes/v1';
import { errorHandler } from './middlewares/errorHandler';
import path from 'path'; // optionnel, mais recommandé

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser(process.env.COOKIE_SECRET));
app.use(cors({ origin: 'http://localhost:3000', credentials: true }));
app.use(helmet({
  contentSecurityPolicy: {
    directives: {
      defaultSrc: ["'self'"],
      scriptSrc: ["'self'", "'unsafe-inline'"],
      styleSrc: ["'self'", "'unsafe-inline'"],
      imgSrc: ["'self'", "data:"],
    },
  },
}));
//const limiter = rateLimit({ windowMs: 15 * 60 * 1000, max: 100 });
//app.use(limiter);

// Servir les fichiers statiques (index.html, etc.)
app.use(express.static('public'));

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

// Routes API versionnées
app.use('/api/v1', v1Routes);

// Route d'accueil (ne sera utilisée que si index.html n'existe pas)
app.get('/', (req, res) => res.json({ message: 'Bienvenue au restaurant Dar Zitoun Twin - API' }));

app.use(errorHandler);

export default app;