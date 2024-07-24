import { error } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';


const PAGE_LIMIT = 10


export const load = (async ({ platform }) => {

	const URL_KV = platform?.env?.URL_KV;

	if (!URL_KV) error(500, { message: 'something went wrong' });

	const links = await URL_KV.list({ prefix: '/', limit: PAGE_LIMIT });

	if (!links || !links.keys) error(500, { message: 'something went wrong' });

	return {
		links: links.keys.map((link: { name: string }) => link.name),
		next: !links.list_complete && links.cursor || null,
	};
}) satisfies PageServerLoad;
