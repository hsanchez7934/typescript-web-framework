import axios, {AxiosPromise} from 'axios';
import {UserProps} from './User';

export class Sync {
	constructor(public rootUrl: string) {}

	fetch = (id: number): AxiosPromise => {
		return axios.get(`${this.rootUrl}/${id}`);
	};

	save = async (data: UserProps): Promise<void> => {
		const {id} = data;

		if (id) {
			await axios.put(`${this.rootUrl}/${id}`, data);
		} else {
			await axios.post(this.rootUrl, data);
		}
	};
}
