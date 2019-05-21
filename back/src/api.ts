import {Router} from 'express'

const Api = Router().get('/', async (req, res) => {
    res.json(res.locals.access_token)
})

export default Api