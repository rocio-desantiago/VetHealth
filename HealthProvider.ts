import KnexAdapter from "./KnexAdapter";
import { camelToSnakeCase } from "./SharedUtilities";

class HealthProvider {
  id: number;
  zipCode: string;
  state: string;
  specialty: string;
  physician_name: string;
  name: string;
  address: string;

  constructor({
    id,
    zipCode,
    state,
    specialty,
    physician_name,
    name,
    address,
  }) {
    this.id = id;
    this.zipCode = zipCode;
    this.state = state;
    this.specialty = specialty;
    this.physician_name = physician_name;
    this.name = name;
    this.address = address;
  }

  async save() {
    let dbObj = {};
    for (const key of Object.keys(this)) {
      let val = this[key];

      dbObj[camelToSnakeCase(key)] = val;
    }
    let knexAdapter = new KnexAdapter();
    await knexAdapter.insert("health_provider", dbObj);
  }

  public static get() {
    let knexAdapter = new KnexAdapter();
    let innerQuery = `SELECT health_provider_id, AVG(clarity_rating) as average_clarity_rating, AVG(bedside_manner_rating) as average_bedside_manner_rating, AVG(insurance_coverage_rating) as average_insurance_coverage_rating, AVG(wait_time_in_minutes) as average_wait_time_in_minutes FROM review GROUP BY health_provider_id`;
    return knexAdapter.rawWithResponseOnly(
      `SELECT * FROM health_provider
    LEFT JOIN (${innerQuery}) as reviews
    ON reviews.health_provider_id = health_provider.id`,
      {}
    );
  }

  public static getById(id) {
    let knexAdapter = new KnexAdapter();
    let innerQuery = `SELECT health_provider_id, AVG(clarity_rating) as average_clarity_rating, AVG(bedside_manner_rating) as average_bedside_manner_rating, AVG(insurance_coverage_rating) as average_insurance_coverage_rating, AVG(wait_time_in_minutes) as average_wait_time_in_minutes FROM review GROUP BY health_provider_id`;
    return knexAdapter.rawWithResponseOnly(
      `SELECT * FROM health_provider
    LEFT JOIN (${innerQuery}) as reviews
    ON reviews.health_provider_id = health_provider.id
    WHERE health_provider.id = :id`,
      {
          id: id
      }
    );
  }

  public static getByState(state) {
    let knexAdapter = new KnexAdapter();
    let innerQuery = `SELECT health_provider_id, AVG(clarity_rating) as average_clarity_rating, AVG(bedside_manner_rating) as average_bedside_manner_rating, AVG(insurance_coverage_rating) as average_insurance_coverage_rating, AVG(wait_time_in_minutes) as average_wait_time_in_minutes FROM review GROUP BY health_provider_id`;
    return knexAdapter.rawWithResponseOnly(
      `SELECT * FROM health_provider
    LEFT JOIN (${innerQuery}) as reviews
    ON reviews.health_provider_id = health_provider.id
    WHERE health_provider.state = :state`,
      {
          state: state
      }
    );
  }
}

export default HealthProvider;
