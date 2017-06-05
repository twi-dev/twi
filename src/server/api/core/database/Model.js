import {Model as MongooseModel} from "mongoose"

class Model extends MongooseModel {
  /**
   * Get an ID of the current Model instance.
   *
   * @return mongoose.Schema.Types.ObjectId
   */
  get id() {
    return this._id
  }

  /**
   * This method is just an alias for mongoose.Schema#toObject,
   *   but use can customize this method safely,
   *   because it will not be used by Mongoose.
   *
   * @access protected
   */
  _toJS(...args) {
    const obj = this.toObject(...args)
    const id = this.id

    const idKey = "_id"
    delete obj[idKey]

    return {
      ...obj, id
    }
  }

  toJS(...args) {
    return this._toJS(...args)
  }
}

export default Model
