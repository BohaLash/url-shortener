import { fail } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';


const PAGE_LIMIT = 10;


export const load = (async ({ platform, params }) => {

	const URL_KV = platform?.env?.URL_KV;

	if (!URL_KV) return fail(500, { message: 'something went wrong' });

	const url = await URL_KV.get('/' + params.shortUrl);

	if (!url) return fail(404, { message: 'URL not found' });

	const totals = await URL_KV.get('totals/' + params.shortUrl);

	const clicks = await URL_KV.list({ prefix: params.shortUrl + '/', limit: PAGE_LIMIT });

	if (!clicks || !clicks.keys) return fail(500, { message: 'something went wrong' });

	return {
		url,
		shortUrl: params.shortUrl,
		totals: parseInt(totals) || 0, // TODO: fix
		clicks: clicks.keys.map((click: { name: string, metadata: any }) => click.metadata),
		next: !clicks.list_complete && clicks.cursor,
	};
}) satisfies PageServerLoad;
