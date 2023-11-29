declare module '$lib/pocketbase' {
	import { Writable } from 'svelte/store';
	import PocketBase from 'pocketbase';

	export const pb: PocketBase;
	export const currentUser: Writable<{
		[key: string]: any;
	} | null>;
}
