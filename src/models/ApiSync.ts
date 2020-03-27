import axios, {AxiosPromise} from 'axios';

// This interface is a contraint
// we're telling typescript that whatever type we pass
// into class ApiSync, that type will have a property of id
// that will be a number
interface HasId {
	id?: number;
}

// Making Sync a generic class
export class ApiSync<T extends HasId> {
	constructor(public rootUrl: string) {}

	fetch = (id: number): AxiosPromise => {
		return axios.get(`${this.rootUrl}/${id}`);
	};

	save = (data: T): AxiosPromise => {
		const {id} = data;

		if (id) {
			return axios.put(`${this.rootUrl}/${id}`, data);
		} else {
			return axios.post(this.rootUrl, data);
		}
	};
}
