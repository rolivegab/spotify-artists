import {Router} from 'express'
import SpotifyRequest from '../core/spotify';

const Api = Router().post('/get-artists-info', async (req, res) => {
    const {artists} = req.body
    const {access_token} = res.locals
    const data = await SpotifyRequest(access_token, 'v1/artists', {
        ids: artists.join(',')
    })
    if (data) {
        res.json(data.data)
    }
})

export default Api