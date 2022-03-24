import 'reflect-metadata';
import { InversifyExpressServer } from 'inversify-express-utils';
import { Container } from 'inversify';
import * as bodyParser from 'body-parser';
import './token.controller';
import { TokenService } from './token.service';
import { UtilService } from './util.service';

import { TYPES } from './types';

// load everything needed to the Container
let container = new Container();
container.bind<TokenService>(TYPES.TokenService).to(TokenService);
container.bind<UtilService>(TYPES.UtilService).to(UtilService);

// start the server
let server = new InversifyExpressServer(container);

server.setConfig((app) => {
  app.use(bodyParser.urlencoded({
    extended: true
  }));
  app.use(bodyParser.json());
});

let serverInstance = server.build();
serverInstance.listen(3000);

console.log('Server started on port 3000 :)');