import axios, {AxiosResponse} from 'axios';
// import {User, UserProps} from './User';
import {Eventing} from './Eventing';

export class Collection<T, K> {
	models: T[] = [];
	events: Eventing = new Eventing();

	constructor(public rootUrl: string, public deserialize: (json: K) => T) {}

	get on() {
		return this.events.on;
	}

	get trigger() {
		return this.events.trigger;
	}

	fetch = async (): Promise<void> => {
		try {
			const response: AxiosResponse = await axios.get(this.rootUrl);
			response.data.forEach((data: K) => {
				this.models.push(this.deserialize(data));
			});

			this.trigger('change');
		} catch (error) {
			throw error;
		}
	};
}
