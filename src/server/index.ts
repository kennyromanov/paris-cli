import { Obj } from './types';
import { has } from './lib';
import config from './config';
console.log('config', config);


// Constants

export const DEFAULT_SERVER_PORT = 5173;

export const DEFAULT_HOST_URL = 'http://localhost';

export const DEFAULT_REMOTES = {};


// Variables

export const port = config?.port ?? DEFAULT_SERVER_PORT;

export const hostUrl = config?.host?.url ?? DEFAULT_HOST_URL;

export const remotes = config?.remotes ?? DEFAULT_REMOTES;

export const remoteUrls = getRemotesUrls(remotes);


// Functions

export function getRemotesUrls(remotes: Obj): Obj<string> {
    const result: Obj<string> = {};


    // Iterating for each remote

    for (const remoteName in remotes) {
        if (!has(remotes, remoteName)) continue;

        const remote = remotes[remoteName];

        result[remoteName] = remote?.url ?? null;
    }


    return result;
}
