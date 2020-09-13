// set DEBUG=app:* && node ./dist/scripts/seedApiKeys.js
import chalk from 'chalk';
import crypto from 'crypto';
import Scope from '../../models/Scope';
import '../../database';
const debug = require('debug')('app:scripts:api-keys');

const adminScopes = [
    'signin:auth',
    'signup:auth',
    'read:movies',
    'create:movies',
    'update:movies',
    'delete:movies',
    'read:user-movies',
    'create:user-movies',
    'delete:user-movies'
];

const publicScopes = [
    'signin:auth',
    'signup:auth',
    'read:movies',
    'read:user-movies',
    'create:user-movies',
    'delete:user-movies'
];

function generateRandomToken() {
    const buffer = crypto.randomBytes(32);
    return buffer.toString('hex');
}

const apiKeys = [
    {
        token: generateRandomToken(),
        scopes: adminScopes
    },
    {
        token: generateRandomToken(),
        scopes: publicScopes
    }
]

async function seedApiKeys() {
    try {
        const promises = apiKeys.map(async apiKey => {
            let newScope = new Scope();
            newScope.scopes = apiKey.scopes;
            newScope.token = apiKey.token;
            return await newScope.save();
        });
        await Promise.all(promises);//wrap the promises for finish the  functions before execute the nexts lines

        debug(chalk.green(`${promises.length} api keys hav been created succesfully`))
        return process.exit(0);

    } catch (error) {
        debug(chalk.red(error));
        process.exit(1);
    }
}

seedApiKeys();