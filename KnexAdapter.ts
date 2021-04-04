let knexConfig = require("./knexConfig").default

class KnexAdapter{
	protected knex: any;
	private DATA_INDEX: number;

	public constructor() {
		this.knex = require("knex")({
			client: "mysql",
			connection: knexConfig,
		});

		this.insert = this.insert.bind(this);
		this.select = this.select.bind(this);
		this.update = this.update.bind(this);
		this.delete = this.delete.bind(this);

		this.DATA_INDEX = 0;
	}

	async insert(tableName: String, model: Object): Promise<any> {
		try {
			return await this.knex(tableName).insert(model);
		} catch (e) {
			console.log(e);
			throw e;
		} 
	}

	async select(
		tableName: String,
		requestedFields: Array<string>,
		query: Object
	): Promise<any> {
		try {
			return await this.knex(tableName).where(query).select(requestedFields);
		} catch (e) {
			console.log(e);
			throw e;
		}
	}

	async update(
		tableName: String,
		query: Object,
		updateModel: Object
	): Promise<any> {
		try {
			return await this.knex(tableName).where(query).update(updateModel);
		} catch (e) {
			console.log(e);
			throw e;
		}
	}

	async delete(tableName: String, query: Object): Promise<any> {
		try {
			return await this.knex(tableName).where(query).del();
		} catch (e) {
			console.log(e);
			throw e;
		}
	}

	async raw(
		query: String,
		parameters: Object
	): Promise<any> {
		return this.knex.raw(query, parameters);
	}

	async rawWithResponseOnly(
		query: String,
		parameters: Object
	): Promise<any> {
		try{
			var response = await this.knex.raw(query, parameters);
			return response && response[this.DATA_INDEX];
		}
		catch(e){
			console.log(`An error has occured while executing query ${query}`);
			console.log(e);
			throw e;
		}
	}
}

export default KnexAdapter;
