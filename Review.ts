import KnexAdapter from "./KnexAdapter";
import { camelToSnakeCase } from "./SharedUtilities";

const tableName = "review";

class Review {
  id: number;
  healthProviderId: number;
  reviewerName: string;
  serviceReceived: string;
  review: string;
  waitTimeInMinutes: number;
  bedsideMannerRating: number;
  clarityRating: number;
  insuranceCoverageRating: number;

  constructor({
    id,
    healthProviderId,
    reviewerName,
    serviceReceived,
    bedsideMannerRating,
    clarityRating,
    waitTimeInMinutes,
    insuranceCoverageRating,
  }) {
    this.id = id;
    this.healthProviderId = healthProviderId;
    this.reviewerName = reviewerName;
    this.serviceReceived = serviceReceived;
    this.bedsideMannerRating = this.validateRating(bedsideMannerRating) && bedsideMannerRating;
    this.clarityRating = this.validateRating(clarityRating) && clarityRating;
    this.waitTimeInMinutes = waitTimeInMinutes;
    this.insuranceCoverageRating = this.validateRating(insuranceCoverageRating) && insuranceCoverageRating;

    for (const key of Object.keys(this)) {
      if (key == "id") {
        continue;
      }

      if (this[key] != 0 && !this[key]) {
        throw new Error(`${key} cannot be null`);
      }
    }
  }

  validateRating(rating: number) {
    const ratingValidationError = new Error(
      "Rating must be a number between 1 and 5"
    );

    if (typeof rating != "number") {
      console.log("Rating is not a number");
      throw ratingValidationError;
    }

    if (rating < 1 || rating > 5) {
      throw ratingValidationError;
    }

    return true;
  }

  async save() {
    let dbObj = {};
    for (const key of Object.keys(this)) {
      let val = this[key];

      dbObj[camelToSnakeCase(key)] = val;
    }
    let knexAdapter = new KnexAdapter();
    await knexAdapter.insert(tableName, dbObj);
  }

  static save() {}

  public static get() {
    let knexAdapter = new KnexAdapter();
    return knexAdapter.select(tableName, ["*"], {});
  }

  public static getById(id) {
    let knexAdapter = new KnexAdapter();
    return knexAdapter.select(tableName, ["*"], { id: id });
  }
}

export default Review;
