"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _objectSpread2 = _interopRequireDefault(require("@babel/runtime/helpers/objectSpread"));

var _objectWithoutProperties2 = _interopRequireDefault(require("@babel/runtime/helpers/objectWithoutProperties"));

var _bcryptjs = require("bcryptjs");

var _ms = _interopRequireDefault(require("ms"));

var _uuid = _interopRequireDefault(require("uuid"));

var _pick = _interopRequireDefault(require("lodash/pick"));

var _omit = _interopRequireDefault(require("lodash/omit"));

var _invariant = _interopRequireDefault(require("@octetstream/invariant"));

var _addMilliseconds = _interopRequireDefault(require("date-fns/addMilliseconds"));

var _jwt = require("../../../core/helper/wrapper/jwt");

var _db = require("../../../core/db");

var _config = _interopRequireDefault(require("../../../core/base/config"));

var _NotFound = _interopRequireDefault(require("../../../core/error/http/NotFound"));

var _Forbidden = _interopRequireDefault(require("../../../core/error/http/Forbidden"));

var _runParallel = _interopRequireDefault(require("../../../core/helper/array/runParallel"));

var _mapObject = _interopRequireDefault(require("../../../core/helper/iterator/sync/mapObject"));

var _User = _interopRequireDefault(require("../User"));

var _schema = _interopRequireDefault(require("./schema"));

var _dec, _class, _temp;

const {
  jwt
} = _config.default;

async function generateToken(payload, options = {}) {
  let {
    expires
  } = options;
  expires = expires ? (0, _addMilliseconds.default)(Date.now(), (0, _ms.default)(expires)) : null;
  const opts = {};

  if (expires) {
    opts.expiresIn = Number(expires);
  }

  payload = await (0, _jwt.sign)(payload, options.secret, opts);
  return {
    payload,
    expires
  };
}

let Session = (_dec = (0, _db.createModel)(_schema.default), _dec(_class = (_temp = class Session extends _db.Model {
  constructor(...args) {
    super(...args);

    this.updateLastLogin = () => this.update({
      "dates.lastLogin": new Date()
    }).exec();
  }

  static get defaultType() {
    return "Bearer";
  }

  static async createOne() {
    (0, _invariant.default)(true, "Method not available on this model.");
  }

  static async createMany() {
    (0, _invariant.default)(true, "Method not available on this model.");
  }
  /**
   * Generate tokens for user and create a new session
   *
   * @param {object} credentials – an object with user login and password
   * @oaram {koa.Context} ctx – Koa.js Context instance
   *
   * @return {object} – an object with generated accessToken and refreshToken
   *   Note that accessToken expires in about 15 minutes.
   *
   * @throws {NotFound} when requested user not found by his login
   * @throws {Error} when wrong password given
   */


  static async sign(_ref) {
    let {
      args,
      ctx,
      options
    } = _ref,
        params = (0, _objectWithoutProperties2.default)(_ref, ["args", "ctx", "options"]);
    const _args$credentials = args.credentials,
          {
      password
    } = _args$credentials,
          credentials = (0, _objectWithoutProperties2.default)(_args$credentials, ["password"]);
    const {
      client,
      ip
    } = ctx;
    const login = new RegExp(`^${credentials.login}$`, "i");
    const user = await _User.default.findByLogin((0, _objectSpread2.default)({}, (0, _omit.default)(params, "node"), {
      ctx,
      options: (0, _objectSpread2.default)({}, options, {
        toJS: false
      }),
      args: {
        login
      }
    }));
    (0, _invariant.default)(!user, _NotFound.default, "Requested user not found. Check your credentials and try again.");
    (0, _invariant.default)(!(await (0, _bcryptjs.compare)(password, user.password)), "Wrong password.");
    const accessToken = await generateToken((0, _pick.default)(user, ["id", "role", "status"]), jwt.accessToken);
    const tokenUUID = (0, _uuid.default)();
    const refreshToken = await generateToken({
      tokenUUID
    }, jwt.refreshToken);
    const tokens = (0, _mapObject.default)({
      accessToken,
      refreshToken
    }, obj => (0, _objectSpread2.default)({}, obj, {
      type: Session.defaultType
    }));
    await super.createOne({
      tokenUUID,
      userId: user.id,
      client: {
        ip,
        name: client.browser.name,
        os: client.os.name
      }
    }, options);
    return tokens;
  }
  /**
   * Refresh user access token
   *
   * @param {string} refreshToken
   *
   * @return {object} – an access roken with expires date
   */


  static async refresh(params) {
    const session = await this.findOneCurrent(params);
    (0, _invariant.default)(!session, _Forbidden.default, "You have no access for this operation.");
    const user = await _User.default.findById((0, _objectSpread2.default)({}, (0, _omit.default)(params, "node"), {
      args: {
        id: session.userId
      }
    }));
    const accessToken = await generateToken((0, _pick.default)(user, ["id", "role", "status"]), jwt.accessToken);
    await (0, _runParallel.default)([user.updateLastVisit, session.updateLastLogin]);
    const type = Session.defaultType;
    return (0, _objectSpread2.default)({}, accessToken, {
      type
    });
  }
  /**
   * Revoke all user session except the current
   *
   * @param {string}
   */


  static async revoke(params) {
    const currentSession = await this.findOneCurrent(params);
    const sessions = await this.find({
      userId: currentSession.userId,
      $not: {
        tokenUUID: currentSession.tokenUUID
      }
    });
    const removed = await Promise.all(sessions.map(sess => sess.remove()));
    return removed.map(({
      id
    }) => id);
  }

  static async findOneCurrent({
    args,
    options
  }) {
    const {
      refreshToken
    } = args;
    const {
      tokenUUID
    } = await (0, _jwt.verify)(refreshToken, jwt.refreshToken.secret);
    return this.findOne({
      tokenUUID
    }, options);
  }

}, _temp)) || _class);
var _default = Session;
exports.default = _default;