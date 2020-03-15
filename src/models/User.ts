// Adding the question mark to the props
// inside of the interface will make it optional

import {Eventing} from './Eventing';
import {Sync} from './Sync';
import {Attributes} from './Attributes';
import {AxiosResponse} from 'axios';

export interface UserProps {
	name?: string;
	age?: number;
	id?: number;
}

const rootUrl = 'http://localhost:3000/users';

export class User {
	public events: Eventing = new Eventing();
	public sync: Sync<UserProps> = new Sync<UserProps>(rootUrl);
	public attributes: Attributes<UserProps>;

	constructor(attrs: UserProps) {
		this.attributes = new Attributes<UserProps>(attrs);
	}

	get on() {
		return this.events.on;
	}

	get trigger() {
		return this.events.trigger;
	}

	get get() {
		return this.attributes.get;
	}

	set = (update: UserProps): void => {
		this.attributes.set(update);
		this.events.trigger('change');
	};

	fetch = async (): Promise<void> => {
		const id = this.get('id');
		if (typeof id !== 'number') {
			throw new Error('Cannot fetch without an id.');
		}
		const response: AxiosResponse = await this.sync.fetch(id);
		this.set(response.data);
	};
}
