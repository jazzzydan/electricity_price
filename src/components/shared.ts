import { writable } from 'svelte/store';

export const priceDataForCountry = writable<number[]>([]);