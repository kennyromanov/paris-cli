import { Obj } from './types';
import { has } from './lib';
import config from './config';


// Constants

export const DEFAULT_SERVER_PORT = 5173;

export const DEFAULT_HOST_URL = 'http://localhost';

export const DEFAULT_REMOTE_ENTRY = 'paris.js';

export const DEFAULT_REMOTE_URL = 'http://localhost:9001/assets';

export const DEFAULT_REMOTES = {};


// Variables

export const serverPort = config?.server?.port ?? DEFAULT_SERVER_PORT;

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
        const remoteEntry = remote?.entry ?? DEFAULT_REMOTE_ENTRY;
        const remoteUrl = remote?.url ?? DEFAULT_REMOTE_URL;

        result[remoteName] = remoteUrl + '/' + remoteEntry;
    }


    return result;
}
