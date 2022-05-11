import { Router } from 'express';
import { sendFeed } from './feed.controllers';
const routerFeed: Router = Router();

routerFeed.get('/feed', sendFeed);

routerFeed.post('/payload', sendFeed);

export default routerFeed;