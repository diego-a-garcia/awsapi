console.log("Hello World");

import express, { Express, Request, Response } from 'express';
import swaggerUi from 'swagger-ui-express';
import swaggerJsdoc from 'swagger-jsdoc';
import { Router } from 'express';
import cors from 'cors';


// Remove dotenv since it's not installed

const app: Express = express();
const port = process.env.PORT || 3000;

// CORS configuration
app.use(cors({
  origin: [
    'http://localhost:5173',  // Keep local development URL
    'https://your-frontend-domain.com', // Add your AWS frontend URL
  ], 
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  credentials: true
}));

// Swagger definition
const swaggerOptions = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Express API with Swagger',
      version: '1.0.0',
      description: 'A sample API for learning Swagger',
    },
    servers: [
      {
        url: `http://localhost:${port}`,
      },
    ],
  },
  apis: ['./src/**/*.ts'], // files containing annotations
};

const swaggerDocs = swaggerJsdoc(swaggerOptions);
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocs));

// Middleware
app.use(express.json());

const router = Router();

/**
 * @swagger
 * /api/example:
 *   get:
 *     summary: Returns an example response
 *     tags: [Example]
 *     responses:
 *       200:
 *         description: Example response
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 data:
 *                   type: string
 */
router.get('/', (req: Request, res: Response) => {
  
    res.json({ data: 'Example response' });
});

export default router;

app.get('/', (req: Request, res: Response) => {
  res.json({ message: 'Hello from TypeScript Express!' });
});
app.get('/favorite-animal', (req: Request, res: Response) => {
    console.log("Hello from TypeScript Express!");
    res.json({ animal: 'Lion' });
  });
app.get('/diego', (req: Request, res: Response) => {
    res.json({ name: 'Diego' });
  });

app.listen(port, '0.0.0.0', () => {
  console.log(`Server is running at http://localhost:${port}`);
  console.log(`Swagger docs available at http://localhost:${port}/api-docs`);
});