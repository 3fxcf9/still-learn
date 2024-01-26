import { error } from '@sveltejs/kit';
import { pb } from '$lib/pocketbase';

type Card = { id: string; term: string; definition: string };

/** @type {import('./$types').PageLoad} */
export async function load({ params }: { params: { slug: string } }) {
	const deck_id = params.slug;
	if (!deck_id || deck_id.trim().length == 0) error(404, "Cette collection n'existe pas.");

	try {
		let deck_details = await pb.collection('decks').getOne(deck_id, {
			expand: 'cards' // TODO: Sort expands by date desc
		});

		return {
			deck_name: deck_details.name,
			deck_id: deck_details.id,
			cards: deck_details.expand?.cards as Card[]
		};
	} catch (_) {
		console.error('Error saving card', _);

		error(404, "Cette collection n'existe pas.");
	}
}
