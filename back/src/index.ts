import dotenv from 'dotenv'
import Express from 'express'
import Api from './api';
import AuthenticateMiddleware from './authenticate';
import ErrorMiddleware from './error';
dotenv.config()

const App = Express()

App
.use(AuthenticateMiddleware)
.use('/', Api)
.use(ErrorMiddleware)
.listen(process.env.PORT, () => {
    console.log(`Server listen on port ${process.env.PORT}`)
})