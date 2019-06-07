"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _objectSpread2 = _interopRequireDefault(require("@babel/runtime/helpers/objectSpread"));

var _isPlainObject = _interopRequireDefault(require("lodash/isPlainObject"));

var _invariant = _interopRequireDefault(require("@octetstream/invariant"));

var _isString = _interopRequireDefault(require("lodash/isString"));

var _markdownIt = _interopRequireDefault(require("markdown-it"));

var _database = require("../../core/database");

var _getType = _interopRequireDefault(require("../../core/helper/util/getType"));

var _schema = _interopRequireDefault(require("./schema"));

var _dec, _class;

const isArray = Array.isArray; // TODO: Replace with remark

const md = new _markdownIt.default({
  breaks: true
});
let Chapter = (_dec = (0, _database.createModel)(_schema.default), _dec(_class = class Chapter extends _database.Model {
  /**
   * Create a new chapter at exiting story
   *
   * @param {string} story – an ID of exiting story
   * @param {object} chapter
   *
   * @return {object}
   */
  static async createOne(chapter, options) {
    (0, _invariant.default)(!chapter, TypeError, "Chapter is required. Received %s", (0, _getType.default)(chapter));
    (0, _invariant.default)(!(0, _isPlainObject.default)(chapter), TypeError, "Chapter should be a plain object. Received %s", (0, _getType.default)(chapter));
    (0, _invariant.default)(!(0, _isString.default)(chapter.text), TypeError, "Chapter text should be a string. Received %", (0, _getType.default)(chapter.text)); // TODO: Move content storage to a static server

    const content = {
      original: chapter.text,
      rendered: md.render(chapter.text)
    };
    return super.createOne((0, _objectSpread2.default)({}, chapter, {
      content
    }), options);
  }

  static async createMany(chapters, options = {}) {
    if (!isArray(chapters)) {
      chapters = [chapters];
    } // TODO: Move chapters serving to files.


    for (const [idx, chapter] of chapters.entries()) {
      chapters[idx].content = {
        original: chapter.text,
        rendered: await md.render(chapter.text)
      };
    }

    return super.createMany(chapters, options);
  }

}) || _class);
var _default = Chapter;
exports.default = _default;