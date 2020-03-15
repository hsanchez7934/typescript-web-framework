// Adding the question mark to the props
// inside of the interface will make it optional

interface UserProps {
	name?: string;
	age?: number;
}

type Callback = () => void;

export class User {
	events: {[key: string]: Callback[]} = {};

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
}