import axios from 'axios'
import urljoin from 'url-join'

export default async function SpotifyRequest<T>(token: string, endpoint: string, params?: any) {
    try {
        return await axios.get<T>(urljoin(process.env.SPOTIFY_API_URL as string, endpoint), {
            params,
            headers: {
                'Authorization': `Bearer ${token}`
            },
        })
    } catch (e) {
        console.log(e)
    }
}