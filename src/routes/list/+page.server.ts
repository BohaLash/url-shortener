import { fail } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';

export const load = (async ({ platform }) => {

	const URL_KV = platform?.env?.URL_KV;

	if (!URL_KV) return fail(500, { message: 'something went wrong' });

	const links = await URL_KV.list({ prefix: '/' });

	if (!links || !links.keys) return fail(500, { message: 'something went wrong' });

	return {
		links: links.keys.map((link: { name: string }) => link.name),
	};
}) satisfies PageServerLoad;
