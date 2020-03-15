// import {UserProps} from './User';

export class Attributes<T> {
	constructor(private data: T) {}

	set = (update: T): void => {
		Object.assign(this.data, update);
	};

	// The K type is a generic constraint
	// This limits the type that K can be
	// In this case: K can only ever be
	// one of the keys of T
	// K can only be name, age, or id from UserProps in our case
	// argument annotation: whatever argument we're passing in, it can only be of type K
	// in this case: name, age, or id from UserProps in our case
	// return annotation: look at interface of T
	// and return the value of the key of K - this allows
	// typescript to know what type its returning: in our case
	// number for id or age and string for name
	get = <K extends keyof T>(key: K): T[K] => {
		return this.data[key];
	};
}

// Code below tests our addition of K generic constraint
// const attrs = new Attributes<UserProps>({
// 	id: 6,
// 	age: 25,
// 	name: 'Mario'
// })

// We get the expected return type
// string for name and number for age

// const name = attrs.get('name');
// const age = attrs.get('age');
