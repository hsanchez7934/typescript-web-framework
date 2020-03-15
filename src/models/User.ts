// Adding the question mark to the props
// inside of the interface will make it optional

import {Eventing} from './Eventing';
import {Sync} from './Sync';

export interface UserProps {
	name?: string;
	age?: number;
	id?: number;
}

const rootUrl = 'http://localhost:3000/users';

export class User {
	public events: Eventing = new Eventing();
	public sync: Sync<UserProps> = new Sync<UserProps>(rootUrl);

	constructor(private data: UserProps) {}

	set = (update: UserProps): void => {
		Object.assign(this.data, update);
	};

	get = (propName: string): string | number => {
		return this.data[propName];
	};
}
