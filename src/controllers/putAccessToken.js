import axios from 'axios';
import { putAuth } from '../firebased';

const clientIds = {
    googleAuth: '956592940308-mn13c8irnli6qgbr0l4nv1phgb7535rg.apps.googleusercontent.com',
    spotifyAuth: '2399131ab0cc47a396121d76c509aef0',
};

const clientSecrets = {
    googleAuth: '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',
    spotifyAuth: 'a52fa2a45e7f4a00af5f5745beab9cdc',
};

const putAccessTokenFromCode = (route, tokenLink) => {
    return async (req, res) => {
        const { code } = req.query;
        const postParams = {
            client_id: clientIds[route],
            client_secret: clientSecrets[route],
            code,
            grant_type: 'authorization_code',
            redirect_uri: `http://localhost:9090/${route}`,

        };
        axios.post(tokenLink, null, { headers: { 'Content-Type': 'application/x-www-form-urlencoded' }, params: postParams }).then((response) => {
            console.log(response.data.access_token);
            putAuth(route, response.data.access_token);
            // res.send(`${route} access token: ${response.data.access_token}`);
            res.send('<p>nice!</p><a href=\'http://localhost:9090\'><button>Go back</button></a>');
        }).catch((error) => {
            console.log(error);
        });
    };
};

export const googleVersion = putAccessTokenFromCode('googleAuth', 'https://oauth2.googleapis.com/token');
export const spotifyVersion = putAccessTokenFromCode('spotifyAuth', 'https://accounts.spotify.com/api/token');

// export default putAccessTokenFromCode;
