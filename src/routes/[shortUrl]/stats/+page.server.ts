import { error } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';
import type { Metadata } from "../+server";
import type { KVNamespaceListKey } from "@cloudflare/workers-types";


const PAGE_LIMIT = 10;


export const load = (async ({ platform, params }) => {
	const URL_KV = platform?.env?.URL_KV;

	if (!URL_KV) error(500, { message: 'something went wrong' });

	const url: string | null = await URL_KV.get('/' + params.shortUrl);

	if (!url) error(404, { message: 'URL not found' });

	const totals = await URL_KV.get('totals/' + params.shortUrl);

	const clicks = await URL_KV.list<Metadata>({ prefix: params.shortUrl + '/', limit: PAGE_LIMIT });

	if (!clicks || !clicks.keys) error(500, { message: 'something went wrong' });

	return {
		url,
		shortUrl: params.shortUrl,
		totals: totals ? parseInt(totals) || 0 : 0,
		clicks: clicks.keys.map((click: KVNamespaceListKey<Metadata, string>) =>
			click.metadata ?? { time: null, ip: '', useragent: '', geo: '' }),
		next: !clicks.list_complete && clicks.cursor || null,
	};
}) satisfies PageServerLoad;
