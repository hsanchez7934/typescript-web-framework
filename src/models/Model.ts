import {AxiosPromise, AxiosResponse} from 'axios';

interface ModelAttributes<T> {
	set(value: T): void;
	getAll(): T;
	get<K extends keyof T>(key: K): T[K];
}

interface Sync<T> {
	fetch(id: number): AxiosPromise;
	save(data: T): AxiosPromise;
}

interface Events {
	on(eventName: string, callback: () => void);
	trigger(eventName: string);
}

interface HasId {
	id?: number;
}

export class Model<T extends HasId> {
			constructor(
				private attributes: ModelAttributes<T>,
				private events: Events,
				private sync: Sync<T>
			) {}
			// We're only able to use this syntax because we're
			// initializing attributes, events, and sync, in the constructor
			// parens

			// Same as the method below, cleaner syntax
			// get on() {
			// 	return this.events.on;
			// }

			on = this.events.on;

			// Same as the method below, cleaner syntax
			// get trigger() {
			// 	return this.events.trigger;
			// }

			trigger = this.events.trigger;

			// Same as the method below, cleaner syntax
			// get get() {
			// 	return this.attributes.get;
			// }

			get = this.attributes.get;

			set = (update: T): void => {
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

			save = async (): Promise<void> => {
				try {
					const response: AxiosResponse = await this.sync.save(
						this.attributes.getAll()
					);
					this.trigger('save');
				} catch (error) {
					this.trigger('error');
				}
			};
		}
