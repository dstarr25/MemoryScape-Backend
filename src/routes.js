import { Router } from 'express';
import { googleVersion, spotifyVersion } from './controllers/putAccessToken';
import { getAuths } from './firebased';

const router = Router();

const getUrl = (req) => {
    const host = req.get('host');
    const { protocol } = req;
    const url = `${protocol}://${host}`;
    return url;
};

router.get('/', (req, res) => {
    // const fileType = req.query['file-type'];
    const url = getUrl(req);
    res.send(`<div> <h1>Memoryscape</h1> <h2>Memoryscape is a web app that allows you to create a playlist based on your memories.</h2> <a href='https://accounts.google.com/o/oauth2/v2/auth?scope=https%3A//www.googleapis.com/auth/photoslibrary.readonly&access_type=online&response_type=code&redirect_uri=${url}/googleAuth&client_id=956592940308-mn13c8irnli6qgbr0l4nv1phgb7535rg.apps.googleusercontent.com'><button>Sign into google photos</button></a> <a href='https://accounts.spotify.com/authorize?response_type=code&client_id=2399131ab0cc47a396121d76c509aef0&redirect_uri=${url}/spotifyAuth&scope=user-read-recently-played%20playlist-read-private%20user-library-read%20playlist-read-collaborative&code_challenge_method=S256'><button>Sign into spotify</button></a> </div>`);
    console.log(process.env.SPOTIFY_CLIENT_ID);
});

router.get('/googleAuth', googleVersion);
router.get('/spotifyAuth', spotifyVersion);
router.get('/auths', async (req, res) => {
    getAuths((result) => {
        res.send(result);
    });
});

export default router;
