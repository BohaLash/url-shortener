import { error } from '@sveltejs/kit';
import type { RequestHandler } from './$types';


const PAGE_LIMIT = 10;


export const GET: RequestHandler = async ({ platform, url }) => {

    const cursor = url.searchParams.get('next') || undefined

    const URL_KV = platform?.env?.URL_KV;

    if (!URL_KV) error(500, 'something went wrong');

    const links = await URL_KV.list({ prefix: '/', limit: PAGE_LIMIT, cursor });

    if (!links || !links.keys) error(500, 'something went wrong');

    const data = {
        links: links.keys.map((link: { name: string }) => link.name),
        next: !links.list_complete && links.cursor,
    };

    return new Response(JSON.stringify(data));
};
