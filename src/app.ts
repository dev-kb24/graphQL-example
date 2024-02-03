import 'dotenv/config'
import { Server } from './infrastructure/server'

const server = new Server(Number(process.env.PORT));
server.start();