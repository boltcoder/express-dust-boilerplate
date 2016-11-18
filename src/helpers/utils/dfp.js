export default class DFP {

	constructor(req){
		this.req = req;
	}

	homeDFP() {

		let ptargeting = [
				{
					key: 'City',
					value: 'www'
				},
				{
					key: 'Category',
					value: 'jobs'
				},
				{
					key: 'SubCat',
					value: ''
				}
			],
			id = 'cnc_hp';

		return {
			id			: id,
			ptargeting  : ptargeting		   
		};
	}

}