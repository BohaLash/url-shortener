import { fail } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';

export const load = (({ cookies }) => {

	return {
		url: 'google.com',
		shortUrl: 'g',
		totals: 0,
		clicks: [
			{
				datetime: '10:00',
				ip: '123.123.123.123',
				useragent: 'Chrome',
				geo: 'USA',
			},
		],
	};
}) satisfies PageServerLoad;
