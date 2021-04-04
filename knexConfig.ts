var knexConfig = {
	host: process.env.db_host,
	port: parseInt(process.env.db_port),
	user: process.env.db_username,
	password: process.env.db_password,
	database: process.env.db_name
};

export default knexConfig;