import { AxiosRequestConfig } from "axios";
import { KiwiOptions } from "../config";

export function buildConfig(options: KiwiOptions): AxiosRequestConfig {
    let { apiKey, baseURL } = options;

    if (!baseURL) {
        baseURL = "https://tequila-api.kiwi.com";
    }
    else if (baseURL.endsWith("/")) {
        baseURL = baseURL.substring(0, baseURL.length - 2);
    }

    const config: AxiosRequestConfig = {
        baseURL: baseURL,
        headers: {
            // accepts: "application/json",
            apikey: apiKey
        },
    };

    return config;
}

export function mergeConfig(baseConfig: AxiosRequestConfig, baseURL: string): AxiosRequestConfig {
    return {
        ...baseConfig,
        baseURL: `${baseConfig.baseURL}/${baseURL}`
    };
}