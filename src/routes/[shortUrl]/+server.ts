import { error } from '@sveltejs/kit';
import { redirect } from '@sveltejs/kit';
import type { RequestHandler } from './$types';

import { v7 as uuidv7 } from 'uuid';


export const GET: RequestHandler = async ({ platform, params, request, getClientAddress }) => {

    console.log(request.headers.get('True-Client-IP'))
    console.log(request.headers.get('CF-Connecting-IP'))
    console.log(getClientAddress())

    const metadata = {
        time: Date.now(),
        ip: request.headers.get('True-Client-IP') ||
            request.headers.get('CF-Connecting-IP') ||
            getClientAddress(),
        useragent: request.headers.get('useragent'),
        geo: request.headers.get('CF-IPCountry'),
    };
    console.log(metadata)

    const URL_KV = platform?.env?.URL_KV;

    if (!URL_KV) return error(500, 'something went wrong');

    const url = await URL_KV.get(params.shortUrl);

    if (!url) return error(404, 'short url not found');

    URL_KV.put(params.shortUrl + '/' + uuidv7(), '', { metadata });

    return redirect(302, url);
};
