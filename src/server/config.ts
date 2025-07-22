import { join } from 'node:path';
import { Obj } from './types';
import { getFileSync, DIR } from './lib';
import exjsona from 'exjsona';
import parisConfigObj from '../../.parisrc.json';


// Constants

export const DEFAULT_CONFIG_NAME = '.parisrc.json';

export const DEFAULT_CONFIG_OBJ_DEPTH = 5;


// Variables

export const defaultConfigFilename = join(DIR, DEFAULT_CONFIG_NAME);

export const parisConfig = exjsona(parisConfigObj, {}, DEFAULT_CONFIG_OBJ_DEPTH);

export const defaultConfig = getConfig();


// Functions

export function getConfigObj(filename: string = defaultConfigFilename): Obj | null {
    const configStr = getFileSync(filename, 'utf8');

    if (configStr)
        return JSON.parse(configStr);
    else
        return null;
}

export function getConfig(filename: string = defaultConfigFilename, variables: Obj = {}, objDepth: number = DEFAULT_CONFIG_OBJ_DEPTH): Obj | null {
    const configObj = getConfigObj(filename);

    if (configObj)
        return exjsona(configObj, { ...parisConfig, ...variables }, objDepth);
    else
        return exjsona(parisConfig, variables, objDepth);
}


export default defaultConfig;
