import express from 'express';
import { graphqlHTTP } from 'express-graphql';
import { MessagesController } from '../exposition/controllers/messages.controller';
import {Mongoose} from './mongoose/mongoose.connect';
import { messageType } from './graphQl/schema.grahql';

export class Server {
  app: express.Application;
  port: number;
  router: express.Router;

  constructor(port: number) {
    this.port = port;
    this.app = express();
    this.getModules();
  }

  getModules(){
    this.app.use("/api/messages", graphqlHTTP({
      schema: new MessagesController(messageType).exec(),
      graphiql: true,
    }));
  }

  async start() {
    try {
      const mongoose = new Mongoose().connect();
      mongoose.on('error', console.error.bind(console, 'Erreur de connexion à MongoDB :'));
      mongoose.once('open', () => {
        console.log('Connecté à MongoDB');
        this.app.listen(this.port, () => {
          console.log(`Serveur GraphQL en cours d'exécution sur http://localhost:${this.port}/api`);
        });
      });
    } catch (error) {
      throw error;
    }
  }
}



