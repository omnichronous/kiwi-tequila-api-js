import { ofetch, FetchOptions } from "ofetch"
import { KiwiOptions } from "../config";

export function buildConfig(options: KiwiOptions): FetchOptions<'json'> {
    let { apiKey, baseURL } = options;

    if (!baseURL) {
        baseURL = "https://tequila-api.kiwi.com";
    }
    else if (baseURL.endsWith("/")) {
        baseURL = baseURL.substring(0, baseURL.length - 2);
    }

    const config: FetchOptions<'json'> = {
        baseURL: baseURL,
        headers: {
            // accepts: "application/json",
            apikey: apiKey
        },
    };

    return config;
}

export function mergeConfig(baseConfig: FetchOptions<'json'>, baseURL: string): FetchOptions<'json'> {
    return {
        ...baseConfig,
        baseURL: `${baseConfig.baseURL}/${baseURL}`
    };
}