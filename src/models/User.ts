// Adding the question mark to the props
// inside of the interface will make it optional

import {Eventing} from './Eventing'

interface UserProps {
	name?: string;
	age?: number;
	id?: number;
}

export class User {
	public events: Eventing = new Eventing();

	constructor(private data: UserProps) {}

	set = (update: UserProps): void => {
		Object.assign(this.data, update);
	};

	get = (propName: string): string | number => {
		return this.data[propName];
	};
}
