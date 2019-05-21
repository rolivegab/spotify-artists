import axios from 'axios'
import {Request, Response, NextFunction} from 'express'

let access_token: string
let expiration_time: number
let last_call_timestamp: number

interface HttpResponse {
    access_token: string
    expires_in: number
}

const AuthenticateMiddleware = async (req: Request, res: Response, next: NextFunction) => {
    try {
        if (access_token && last_call_timestamp + expiration_time - 30000 > Date.now()) {
            res.locals.access_token = access_token
            return next()
        }
        const httpResponse = await axios.post<HttpResponse>('https://accounts.spotify.com/api/token', undefined, {
            params: {
                grant_type: 'client_credentials'
            },
            auth: {
                username: process.env.CLIENT_ID as string,
                password: process.env.CLIENT_SECRET as string
            }
        })

        if (httpResponse.status === 200) {
            const {data} = httpResponse
            access_token = data.access_token
            last_call_timestamp = Date.now()
            expiration_time = data.expires_in * 1000
            res.locals.access_token = httpResponse.data.access_token
            next()
        } else {
            res.status(500).json({error: 'Erro ao realizar processo de autenticação'})
            next(new Error('res.status not 200 on authentication middleware'))
        }
    } catch (e) {
        next(e)
    }
}

export default AuthenticateMiddleware