require('dotenv').config()
require('express-async-errors')
const express = require('express')
const authRouter = require('./routes/auth')
const jobsRouter = require('./routes/jobs')
const authenticateUser = require('./middleware/authentication')
const connectDB = require('./db/connect')
const app = express()

// Extra security packages
const helmet = require('helmet')
const cors = require('cors')
const xss = require('xss-clean')
const rateLimiter = require('express-rate-limit')

// Swagger UI
const swaggerUI = require('swagger-ui-express')
const YAML = require('yamljs')
const swaggerDocument = YAML.load('./swagger.yaml')

// error handler
const notFoundMiddleware = require('./middleware/not-found')
const errorHandlerMiddleware = require('./middleware/error-handler')
// middlewares
app.set('trust proxy', 1)
app.use(
  rateLimiter({
    windowMs: 60 * 1000,
    max: 60,
  }),
)

app.use(express.json())
app.use(helmet())
app.use(cors())
app.use(xss())

app.get('/', (req, res) => res.send('<h1>JOBS-API</h1><a href="/api-docs">Documentation</a>'))
app.use('/api-docs', swaggerUI.serve, swaggerUI.setup(swaggerDocument))
// routes
app.use('/api/v1/auth', authRouter)
app.use('/api/v1', authenticateUser, jobsRouter)

app.use(notFoundMiddleware)
app.use(errorHandlerMiddleware)

const port = process.env.PORT || 3000

const start = async () => {
  try {
    await connectDB(process.env.MONGO_URI)
    app.listen(port, () => console.log(`Server is listening on port ${port}...`))
  } catch (error) {
    console.log(error)
  }
}

start()
