import { error } from '@sveltejs/kit';
import { redirect } from '@sveltejs/kit';
import type { RequestHandler } from './$types';

const db: { [index: string]: string } = {
    'g': 'https://google.com',
    'fb': 'https://facebook.com',
    'yt': 'https://youtube.com',
}

export const GET: RequestHandler = ({ params }) => {

    const url = db[params.shortUrl]

    if (!url) return error(404, 'short url not found');

    return redirect(302, url);
};