import { fail } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';

export const load = (({ cookies }) => {

	interface Link {
		url: string
		shortUrl: string
	}

	const links: Link[] = [
		{
			url: 'google.com',
			shortUrl: 'goo',
		},
		{
			url: 'youtube.com',
			shortUrl: 'yt',
		},
		{
			url: 'facebook.com',
			shortUrl: 'fb',
		},
	]

	return {
		links,
	};
}) satisfies PageServerLoad;
