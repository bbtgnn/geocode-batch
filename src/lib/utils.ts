import type { LatLng, MapQuestResponse } from './types';

/**
 * Divides a string at every new line
 * @param s The string to split
 * @returns An array of parts
 */

export function splitNewlines(s: string): Array<string> {
	return s.split(/\r?\n/);
}

/**
 * Builds
 * @param lines Array of location strings
 * @returns The url for batch request
 */

export function buildReqQuery(lines: Array<string>): string {
	if (lines.length > 100) {
		throw new Error('Mapquest Batch Geocoding has a limit of 100 locations');
	}

	// Building query by adding lines
	let query = '';
	lines.forEach((line) => {
		query += `&location=${encodeURIComponent(line)}`;
	});

	return query;
}

/**
 *
 * @param key Mapquest API Key
 * @param query Mapquest batch geocoding query
 * @returns The request url
 */

export function buildReqUrl(key: string, query: string): string {
	return `https://www.mapquestapi.com/geocoding/v1/batch?key=${key}${query}`;
}

/**
 *
 * @param key Mapquest API Key
 * @param lines Array of location lines
 * @returns Mapquest response
 */

export async function fetchLines(key: string, lines: Array<string>): Promise<MapQuestResponse> {
	// Building url
	const query = buildReqQuery(lines);
	const url = buildReqUrl(key, query);

	// Fetching data
	const req = await fetch(url);
	return (await req.json()) as MapQuestResponse;
}

/**
 * Transforms the response in an array of coordinates
 * @param res The mapquest response
 * @returns Array of array of latlng
 */

export function responseToCoordinates(res: MapQuestResponse): Array<Array<LatLng>> {
	return res.results.map((r) => {
		return r.locations.map((l) => {
			return l.latLng;
		});
	});
}

/**
 * Merges together the locations of a single entry
 * @param locations
 * @returns
 */

export function formatLocations(locations: Array<LatLng>) {
	// Base string
	let line = '';

	// Iterating over locations of a single place
	for (let loc of locations) {
		// Adding separator for previous entry
		if (line !== '') {
			line += ' | ';
		}

		// Formatting location
		line += `${loc.lat}, ${loc.lng}`;
	}

	return line;
}

/**
 *
 * @param coords
 * @returns
 */

export function formatCoordinates(coords: Array<Array<LatLng>>): string {
	let text = '';

	for (let locations of coords) {
		text += formatLocations(locations);
		text += '\n';
	}

	return text;
}
