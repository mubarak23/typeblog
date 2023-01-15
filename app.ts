import express from 'express';
import helmet from 'helmet';
import cors from 'cors';
import dotenv from 'dotenv';
import multer from 'multer';
import compression from 'compression';
import { errorHandler, notFound } from './errors/errorHandler';
import authRouter from './routes/auth';
import postRouter from './routes/post'

dotenv.config()

class Server {
    public app: express.Application;

    constructor() {
        this.app = express();
        this.config();
        this.routes();
    }

    public config(): void {
        // Enable security middlewares
        this.app.use(helmet());
        this.app.use(cors());
        this.app.use(compression());

        // express body parser
        this.app.use(express.json());
        this.app.use(express.urlencoded({ extended: false }));

        // upload file
        const storage = multer.diskStorage({
            destination: function (req, file, cb) {
              cb(null, './public/upload');
            },
            filename: function (req, file, cb) {
              cb(null, Date.now() + file.originalname);
            },
          });
          
          const upload = multer({ storage });
          
          this.app.post('/api/upload', upload.single('file'), (req, res) => {
            const file = req.file as unknown as Express.Multer.File[];
            res.status(200).json(file[0].fieldname);
          });



        // routes
        // set home route
        this.app.get('/', (req, res) => {
            res.status(200).json({ message: 'Welcome to Type Blog API' });
        });
        this.app.use('/api/v1', authRouter);
        this.app.use('/api/v1', postRouter);



        // set up 404 error handling here
        this.app.use(notFound)

        // set up global error handling here
        this.app.use(errorHandler)
    }

    public routes(): void {
        // Set up routes here
    }
}

const server = new Server();

export default server.app;
