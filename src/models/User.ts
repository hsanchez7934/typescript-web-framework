// Adding the question mark to the props
// inside of the interface will make it optional

import axios, {AxiosResponse} from 'axios';

interface UserProps {
	name?: string;
	age?: number;
	id?: number;
}

type Callback = () => void;

export class User {
	events: {[key: string]: Callback[]} = {};
	url: string = 'http://localhost:3000';

	constructor(private data: UserProps) {}

	set = (update: UserProps): void => {
		Object.assign(this.data, update);
	};

	get = (propName: string): string | number => {
		return this.data[propName];
	};

	on = (eventName: string, callback: Callback): void => {
		const handlers = this.events[eventName] || [];
		handlers.push(callback);
		this.events[eventName] = handlers;
	};

	trigger = (eventName: string): void => {
		const handlers = this.events[eventName];

		if (!handlers || handlers.length === 0) {
			return;
		}

		handlers.forEach(callback => {
			callback();
		});
	};

	fetch = async (): Promise<void> => {
		const response: AxiosResponse = await axios.get(
			`${this.url}/users/${this.get('id')}`
		);
		this.set(response.data);
	};

	save = async (): Promise<void> => {
		const id = this.get('id');

		if (id) {
			await axios.put(`${this.url}/users/${id}`, this.data);
		} else {
			await axios.post(`${this.url}/users`, this.data);
		}
	};
}
