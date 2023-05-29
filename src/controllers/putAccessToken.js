import axios from 'axios';
import { putAuth } from '../firebased';

const clientIds = () => {
    return {
        googleAuth: process.env.GOOGLE_PHOTOS_CLIENT_ID,
        spotifyAuth: process.env.SPOTIFY_CLIENT_ID,
    };
};

const clientSecrets = () => {
    return {
        googleAuth: process.env.GOOGLE_PHOTOS_CLIENT_SECRET,
        spotifyAuth: process.env.SPOTIFY_CLIENT_SECRET,
    };
};

const getUrl = (req) => {
    const host = req.get('host');
    const { protocol } = req;
    const url = `${protocol}://${host}`;
    return url;
};

const putAccessTokenFromCode = (route, tokenLink) => {
    return async (req, res) => {
        const url = getUrl(req);
        console.log(`url: ${url}`);
        const { code } = req.query;
        const postParams = {
            client_id: clientIds()[route],
            client_secret: clientSecrets()[route],
            code,
            grant_type: 'authorization_code',
            redirect_uri: `${url}/${route}`,

        };
        axios.post(tokenLink, null, { headers: { 'Content-Type': 'application/x-www-form-urlencoded' }, params: postParams }).then((response) => {
            console.log(response.data.access_token);
            putAuth(route, response.data.access_token);
            // res.send(`${route} access token: ${response.data.access_token}`);
            res.send(`<p>nice!</p><a href='${url}'><button>Go back</button></a>`);
        }).catch((error) => {
            console.log(error);
        });
    };
};

export const googleVersion = putAccessTokenFromCode('googleAuth', 'https://oauth2.googleapis.com/token');
export const spotifyVersion = putAccessTokenFromCode('spotifyAuth', 'https://accounts.spotify.com/api/token');

// export default putAccessTokenFromCode;
