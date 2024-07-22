import { error } from '@sveltejs/kit';
import { redirect } from '@sveltejs/kit';
import type { RequestHandler } from './$types';


export const GET: RequestHandler = async ({ params, platform }) => {
    const URL_KV = platform?.env?.URL_KV

    if (!URL_KV) return error(500, 'something went wrong');

    const url = await URL_KV.get(params.shortUrl)

    if (!url) return error(404, 'short url not found');

    return redirect(302, url);
};
