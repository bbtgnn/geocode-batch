import { writable } from 'svelte-local-storage-store';

export const MQkey = writable<string>('MQkey', '');
