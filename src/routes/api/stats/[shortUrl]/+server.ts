import { error } from '@sveltejs/kit';
import type { RequestHandler } from './$types';


const PAGE_LIMIT = 10;


export const GET: RequestHandler = async ({ platform, params, url }) => {

    const shortUrl = params.shortUrl
    const cursor = url.searchParams.get('next') || undefined

    const URL_KV = platform?.env?.URL_KV;

    if (!URL_KV) error(500, 'something went wrong');

    const clicks = await URL_KV.list({ prefix: shortUrl + '/', limit: PAGE_LIMIT, cursor });

    if (!clicks || !clicks.keys) error(500, 'something went wrong');

    const data = {
        clicks: clicks.keys.map((click: { name: string, metadata: any }) => click.metadata),
        next: !clicks.list_complete && clicks.cursor,
    };

    return new Response(JSON.stringify(data));
};
