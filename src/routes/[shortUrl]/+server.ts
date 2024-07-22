import { error } from '@sveltejs/kit';
import { redirect } from '@sveltejs/kit';
import type { RequestHandler } from './$types';

import { v7 as uuidv7 } from 'uuid';


export const GET: RequestHandler = async ({ platform, params, request, getClientAddress }) => {

    const metadata = {
        time: Date.now(),
        ip: request.headers.get('True-Client-IP') ||
            request.headers.get('CF-Connecting-IP') ||
            getClientAddress(),
        useragent: request.headers.get('user-agent'),
        geo: request.headers.get('CF-IPCountry'),
    };

    const URL_KV = platform?.env?.URL_KV;

    if (!URL_KV) return error(500, 'something went wrong');

    const url = await URL_KV.get('/' + params.shortUrl);

    if (!url) return error(404, 'short url not found');

    await URL_KV.put(params.shortUrl + '/' + uuidv7(), '', { metadata });

    const totals = parseInt(await URL_KV.get('totals/' + params.shortUrl)) || 0;
    await URL_KV.put('totals/' + params.shortUrl, totals + 1);

    return redirect(302, url);
};
