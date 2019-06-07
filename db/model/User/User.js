"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _objectSpread2 = _interopRequireDefault(require("@babel/runtime/helpers/objectSpread"));

var _path = require("path");

var _bcryptjs = require("bcryptjs");

var _promiseFs = require("promise-fs");

var _invariant = _interopRequireDefault(require("@octetstream/invariant"));

var _isPlainObject = _interopRequireDefault(require("lodash/isPlainObject"));

var _isEmpty = _interopRequireDefault(require("lodash/isEmpty"));

var _partial = _interopRequireDefault(require("lodash/partial"));

var _async = _interopRequireDefault(require("nanoid/async"));

var _db = require("../../../core/db");

var _mkdirp = _interopRequireDefault(require("../../../core/helper/util/mkdirp"));

var _runSerial = _interopRequireDefault(require("../../../core/helper/array/runSerial"));

var _class, _temp;

const AVATAR_SAVE_ROOT = (0, _path.join)(__dirname, "..", "..", "static", "assets", "files", "avatars");

let User = (0, _db.createModel)(_class = (_temp = class User extends _db.Model {
  constructor(...args) {
    super(...args);

    this.verifyPassword = async string => {
      if (!string) {
        return false;
      }

      if (!this.password) {
        const user = await User.findById({
          args: {
            id: this._id
          }
        });
        return (0, _bcryptjs.compare)(string, user.password);
      }

      return (0, _bcryptjs.compare)(string, this.password);
    };
  }

  /**
   * User account status
   */
  static get statuses() {
    return {
      unactivated: 0,
      activated: 1,
      suspended: 2,
      banned: 3
    };
  }
  /**
   * Available user roles
   *
   * @return {object}
   */


  static get roles() {
    return {
      su: 0,
      admin: 1,
      mod: 2,
      user: 3
    };
  }
  /**
   * Create a new regular user.
   *
   * @param {object} user – user information
   * @param {object} [options = {}]
   *
   * @return {object}
   */


  static async createOne(user, options) {
    (0, _invariant.default)(!(0, _isPlainObject.default)(user), TypeError, "User data information should be passed as plain JavaScript object.");
    (0, _invariant.default)((0, _isEmpty.default)(user), TypeError, "User information cannot be empty.");
    const password = await (0, _bcryptjs.hash)(user.password, 15);

    if (user.role != null) {
      user.role = User.roles.user;
    }

    if (user.status != null) {
      user.status = User.statuses.user;
    }

    return super.createOne((0, _objectSpread2.default)({}, user, {
      password
    }), options);
  }

  static async createMany() {
    throw new Error("This method is not allowed in this class. Use User.createOne instead.");
  }
  /**
   * Get user by his login
   *
   * @param {string} login
   *
   * @return {object}
   *
   * @throws {NotFound} – when user is not found
   */


  static findByLogin(login) {
    return this.findOne({
      login: new RegExp(`^${login}$`, "i")
    });
  }
  /**
   * Updates viewer's avatar
   */
  // Rewrite this from scratch


  async updateAvatar(file) {
    const {
      path,
      extname
    } = file;
    const dir = (0, _path.join)(AVATAR_SAVE_ROOT, this.id);
    const dest = (0, _path.join)(dir, (await (0, _async.default)()), extname);
    await (0, _runSerial.default)([(0, _partial.default)(_mkdirp.default, [dir]), (0, _partial.default)(_promiseFs.copyFile, [path, dest])]);
    return User.findById(this.id);
  }
  /**
   * Removes viewer's avatar
   */


  static async removeAvatar(id) {
    const user = await this.findViewer(id);

    try {
      await (0, _promiseFs.unlink)(user.avatar);
    } catch (err) {
      if (err.code !== "ENOENT") {
        throw err;
      }
    }

    return this.findById(id);
  }

  /**
   * Get user role name
   *
   * @private
   */
  get roleName() {
    return this._findKey(User.roles, this.role);
  }
  /**
   * Get user status name
   *
   * @private
   */


  get statusName() {
    return this._findKey(User.statuses, this.status);
  }
  /**
   * Check if given user account have banned status
   *
   * @return {boolean}
   */


  get isBanned() {
    return this.status === User.statuses.banned;
  }
  /**
   * Check if given user account have suspended status
   *
   * @return {boolean}
   */


  get isSuspended() {
    return this.status === User.statuses.suspended;
  }
  /**
   * Check if given user account have activated status
   *
   * @return {boolean}
   */


  get isActivated() {
    return this.status === User.statuses.activated;
  }
  /**
   * Check if given user account have unactivated status
   *
   * @return {boolean}
   */


  get isUnactivated() {
    return this.status === User.statuses.unactivated;
  }
  /**
   * Check if user is "USER"
   *
   * @return {boolean}
   */


  get isUser() {
    return this.role === User.roles.user;
  }
  /**
   * Check if user is "MOD"
   *
   * @return {boolean}
   */


  get isMod() {
    return this.role === User.roles.mod;
  }
  /**
   * Check if user is "ADMIN"
   *
   * @return {boolean}
   */


  get isAdmin() {
    return this.role === User.roles.admin;
  }
  /**
   * Check if user is "SU"
   *
   * @return {boolean}
   */


  get isSu() {
    return this.role === User.roles.su;
  }
  /**
   * @see Model#toJS
   */


  async toJS(options) {
    const user = await super.toJS(options);

    if (user.role != null) {
      user.role = this.roleName.toUpperCase();
    }

    if (user.status != null) {
      user.status = this.statusName.toUpperCase();
    }

    return user;
  }

}, _temp)) || _class;

var _default = User;
exports.default = _default;
//# sourceMappingURL=User.js.map