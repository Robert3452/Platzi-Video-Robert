import mongoose, { ConnectionOptions } from 'mongoose';
import config from './config';

let { dbName, dbPassword, dbUser, dbHost } = config;

dbPassword = encodeURIComponent(dbPassword!!);//variable!! guarantees that the variable it won't be a null or undefined variable
dbUser = encodeURIComponent(dbUser!!);


const dbOptions: ConnectionOptions = {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true
}
const dbUri = `mongodb+srv://${dbUser}:${dbPassword}@${dbHost}/${dbName}?retryWrites=true&w=majority`;
mongoose.connect(dbUri, dbOptions);

const connection = mongoose.connection;

connection.once('open', () => {
    console.log('Database connection stablished');
});

connection.on('error', err => {
    console.log(err);
    process.exit(0);
})