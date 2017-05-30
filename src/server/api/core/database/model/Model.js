import {Model as MongooseModel} from "mongoose"

class Model extends MongooseModel {
  /**
   * Get field that will be used for schema of the current Model.
   *
   * @param object Types – object of Mongoose types
   *
   * @return object – an object of the fields
   *
   * @access public
   * @static
   */
  static getModelFields = () => {
    throw new TypeError(
      "This method should be implemented on a child model."
    )
  }

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
