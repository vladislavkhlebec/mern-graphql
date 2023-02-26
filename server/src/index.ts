import colors from 'colors';
import dotenv from 'dotenv';
import express, { Express } from 'express';
import * as fs from 'fs';
import { createSchema, createYoga } from 'graphql-yoga';
import * as path from 'path';

import { connectDB } from './config/db';
import { Mutation } from './resolvers/Mutation';
import { Query } from './resolvers/Query';

dotenv.config();
colors.enable();

const app: Express = express();
const port = process.env.PORT;

console.log(process.env.MONGODB_URI);

connectDB();

const resolvers = {
  Query,
  Mutation
};

const schema = createSchema({
  typeDefs: fs.readFileSync(path.join(__dirname, 'schema', 'root.schema.graphql'), 'utf-8'),
  resolvers
});

const yoga = createYoga({
  schema
});

app.use('/graphql', yoga);

app.listen(port, () => {
  console.log(`⚡️[server]: Server is running at http://localhost:${port}`);
});
