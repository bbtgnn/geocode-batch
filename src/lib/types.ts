export interface Copyright {
	text: string;
	imageUrl: string;
	imageAltText: string;
}

export interface Info {
	statuscode: number;
	copyright: Copyright;
	messages: any[];
}

export interface Options {
	maxResults: number;
	thumbMaps: boolean;
	ignoreLatLngInput: boolean;
}

export interface ProvidedLocation {
	location: string;
}

export interface LatLng {
	lat: number;
	lng: number;
}

export interface DisplayLatLng {
	lat: number;
	lng: number;
}

export interface Location {
	street: string;
	adminArea6: string;
	adminArea6Type: string;
	adminArea5: string;
	adminArea5Type: string;
	adminArea4: string;
	adminArea4Type: string;
	adminArea3: string;
	adminArea3Type: string;
	adminArea1: string;
	adminArea1Type: string;
	postalCode: string;
	geocodeQualityCode: string;
	geocodeQuality: string;
	dragPoint: boolean;
	sideOfStreet: string;
	linkId: string;
	unknownInput: string;
	type: string;
	latLng: LatLng;
	displayLatLng: DisplayLatLng;
	mapUrl: string;
}

export interface Result {
	providedLocation: ProvidedLocation;
	locations: Location[];
}

export interface MapQuestResponse {
	info: Info;
	options: Options;
	results: Result[];
}
