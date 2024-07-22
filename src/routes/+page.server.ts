import { fail } from '@sveltejs/kit';
import type { Actions } from './$types';

import { validateUrl, validateShortUrl } from './validators';


export const actions = {
    default: async ({ request, platform }) => {

        const data = await request.formData();

        let valid = true
        const validationErrors: { [index: string]: string[] } = {}

        const validators = {
            url: validateUrl,
            shortUrl: validateShortUrl,
        }

        Object.entries(validators).forEach(([key, validator]) => {
            const errors = validator(data.get(key))
            if (errors.length) {
                validationErrors[key] = errors
                valid = false
            }
        })

        if (!valid) {
            return fail(400, { success: false, validationErrors });
        }

        const URL_KV = platform?.env?.URL_KV

        if (!URL_KV) return fail(500, {
            success: false,
            validationErrors: { nonFieldErrors: ['Something went wrong'] },
        });

        const url = data.get('url') as string;
        const shortUrl = data.get('shortUrl') as string;

        const existingUrl = await URL_KV.get(shortUrl)
        if (existingUrl) return fail(402, {
            success: false,
            validationErrors: { shortUrl: ['Shortening already taken'] },
        });

        await URL_KV.put(shortUrl, url)

        return { success: true, stats: shortUrl + '/stats', validationErrors: undefined };
    },
} satisfies Actions;
