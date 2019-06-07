"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _objectSpread2 = _interopRequireDefault(require("@babel/runtime/helpers/objectSpread"));

var _objectWithoutProperties2 = _interopRequireDefault(require("@babel/runtime/helpers/objectWithoutProperties"));

var _applyDecoratedDescriptor2 = _interopRequireDefault(require("@babel/runtime/helpers/applyDecoratedDescriptor"));

var _limax = _interopRequireDefault(require("limax"));

var _nanoid = _interopRequireDefault(require("nanoid"));

var _isEmpty = _interopRequireDefault(require("lodash/isEmpty"));

var _isPlainObject = _interopRequireDefault(require("lodash/isPlainObject"));

var _invariant = _interopRequireDefault(require("@octetstream/invariant"));

var _graphqlFieldsList = require("graphql-fields-list");

var _db = require("../../../core/db");

var _selectFromGraphQLFields = _interopRequireDefault(require("../../../core/db/decorator/selectFromGraphQLFields"));

var _Chapter = _interopRequireDefault(require("../Chapter"));

var _NotFound = _interopRequireDefault(require("../../../core/error/http/NotFound"));

var _Forbidden = _interopRequireDefault(require("../../../core/error/http/Forbidden"));

var _class, _class2, _temp;

const isArray = Array.isArray;

let Story = (0, _db.createModel)(_class = (_class2 = (_temp = class Story extends _db.Model {
  constructor(...args) {
    super(...args);

    this.__getRoleName = role => this._findKey(Story.roles, role);
  }

  /**
   * Collaborators roles
   */
  static get roles() {
    return {
      beta: 0,
      painter: 1,
      translator: 2,
      writer: 3,
      editor: 4
    };
  }

  static getRole(name) {
    return this.roles[name.toLowerCase()];
  }

  static _findById({
    args
  }) {
    return super.findById(args.id);
  }

  static findMany({
    args
  }) {
    return super.findMany(args);
  }
  /**
   * Create one story
   *
   * @param {mongoose.Types.ObjectId|string} publisher – A user id which will
   *  be added as story publisher
   *
   * @param {object} story – story content
   *
   * @return {object} – created story
   */


  static async createOne(_ref) {
    let {
      args,
      ctx,
      options
    } = _ref,
        params = (0, _objectWithoutProperties2.default)(_ref, ["args", "ctx", "options"]);
    const {
      story
    } = args;
    const publisher = ctx.state.user.id;
    (0, _invariant.default)(!publisher, TypeError, "Can't create a story: No publisher's ID given.");
    (0, _invariant.default)(!(0, _isPlainObject.default)(story), TypeError, "Story data should be passed as plain JavaScript object.");
    (0, _invariant.default)((0, _isEmpty.default)(story), TypeError, "Story information is required."); // Add chapters when they're given

    let chapters = null;

    if (story.chapters) {
      const list = await _Chapter.default.createMany((0, _objectSpread2.default)({}, params, {
        options,
        ctx,
        args: {
          chapters: story.chapters
        }
      }));
      chapters = {
        list: list.map(({
          id
        }) => id),
        count: list.length
      };
    }

    const short = (0, _nanoid.default)(10);
    const full = `${(0, _limax.default)(story.title)}.${short}`;
    const slug = {
      short,
      full
    };

    if (isArray(story.collaborators)) {
      // Get role codename for each collaborator
      for (const [idx, collaborator] of story.collaborators.entries()) {
        const role = collaborator.role.toLowerCase();
        story.collaborators[idx].role = this.roles[role];
      }
    } // Mark story as draft when there are no chapters created.


    const isDraft = (0, _isEmpty.default)(chapters);
    return super.createOne((0, _objectSpread2.default)({}, story, {
      publisher,
      slug,
      chapters,
      isDraft
    }), options);
  }

  static async createMany() {
    (0, _invariant.default)(true, "This method is not allowed in this class. Use %s.createOne instead.", Story.name);
  }

  static async addChapter(_ref2) {
    let {
      args,
      options
    } = _ref2,
        params = (0, _objectWithoutProperties2.default)(_ref2, ["args", "options"]);
    const {
      id
    } = args,
          fields = (0, _objectWithoutProperties2.default)(args, ["id"]);
    const story = await this.findById({
      args: id
    });
    (0, _invariant.default)(!story, _NotFound.default, "Can't find requested story.");
    const chapter = await _Chapter.default.createOne((0, _objectSpread2.default)({}, params, {
      args: {
        chapter: fields
      },
      options
    }));
    await story.update({
      $inc: {
        "chapters.count": 1
      },
      $push: {
        "chapters.list": chapter.id
      }
    });
    return chapter;
  }
  /**
   * Add a new collaborator to the story
   *
   * @param {string | mongoose.Types.ObjectId} viewer – the current user ID
   * @param {string | mongoose.Types.ObjectId} story – story ID
   * @param {string | mongoose.Types.ObjectId} user – ID of a new collaborator
   * @param {string} role – role of a new collaborator
   * @param {object} [options = {}]
   *
   * @return {object | mongoose.Document}
   *
   * @throws {NotFound} – when no story has found by given ID
   * @throws {Forbidden} – if the current user is not story publisher
   */


  static async addOneCollaborator(params) {
    const {
      args,
      ctx
    } = params;
    const {
      collaborator
    } = args;
    const viewer = ctx.state.user.id;
    const story = await this._findById(params);
    (0, _invariant.default)(!story, _NotFound.default, "Can't find requested story.");
    (0, _invariant.default)(!this.isPublisher(viewer), _Forbidden.default, "You have not access for this operation. " + "Only the story publisher can update title.");
    collaborator.role = this.getRole(collaborator.role);
    await story.update({
      collaborators: {
        $push: collaborator
      }
    });
    return this._findById(params);
  } // static async addOneVote(user, story, vote, options = {}) {}

  /**
   * Update story title
   *
   * @param {string | mongoose.Types.ObjectId} viewer – the current user ID
   * @param {string | mongoose.Types.ObjectId} story – story ID
   * @param {string} title – the new title for story
   * @param {object} [options = {}]
   *
   * @return {object | mongoose.Document}
   *
   * @throws {NotFound} – when no story has found by given ID
   * @throws {Forbidden} – if the current user is not story publisher
   */


  static async updateOneTitle({
    args,
    ctx,
    node,
    options
  }) {
    const selections = (0, _graphqlFieldsList.fieldsList)(node);
    const {
      id,
      title
    } = args;
    const viewer = ctx.state.user.id;
    let story = await this.findById({
      node,
      args: {
        id
      }
    });
    (0, _invariant.default)(!story, _NotFound.default, "Can't find requested story.");
    (0, _invariant.default)(!this.isPublisher(viewer), _Forbidden.default, "You have not access for this operation. " + "Only the story publisher can update title.");
    await story.update({
      title
    });
    story = story.findById(id).select(selections);
    return this._tryConvert(story, options);
  }

  static async updateOneDescription(_ref3) {
    let {
      args,
      options,
      ctx
    } = _ref3,
        params = (0, _objectWithoutProperties2.default)(_ref3, ["args", "options", "ctx"]);
    const viewer = ctx.state.user.id;
    const {
      id,
      description
    } = args.story;
    const story = await this.findById((0, _objectSpread2.default)({}, params, {
      args: {
        id
      }
    }));
    (0, _invariant.default)(!story, _NotFound.default, "Can't find requested story.");
    (0, _invariant.default)(!this.isPublisher(viewer), _Forbidden.default, "You have not access for this operation. " + "Only the story publisher can update description.");
    await story.update({
      description
    });
    return this.findById((0, _objectSpread2.default)({}, params, {
      options,
      args: {
        id
      }
    }));
  }

  static async updateOneStatus(_ref4) {
    let {
      args,
      options
    } = _ref4,
        params = (0, _objectWithoutProperties2.default)(_ref4, ["args", "options"]);
    const viewer = args.state.user.id;
    let isFinished = args.story.isFinished;
    isFinished || (isFinished = false);
    const story = await this._findById((0, _objectSpread2.default)({}, params, {
      args: args.story
    }));
    (0, _invariant.default)(!story, _NotFound.default, "Can't find requested story.");
    (0, _invariant.default)(!this.isPublisher(viewer), _Forbidden.default, "You have not access for this operation. " + "Only the story publisher can update status.");
    await story.update({
      isFinished
    });
    return this._findById((0, _objectSpread2.default)({}, params, {
      args: args.story
    }));
  } // static async updateOneType(viewer, story, translation, options = {}) {}

  /**
   * Find stories created by given publisher
   *
   * @param {string} publisher – ID of an publisher
   *   which stories you are looking for
   *
   * @return {object}
   *
   * @throws {NotFound} – if no stories created by this user founded
   */


  static async findManyByPublisher(publisher, cursor, options = {}) {
    return super.findMany(cursor, {
      publisher
    }, undefined, options);
  }
  /**
   * Get story by short/full slug
   *
   * @param {string} slug
   *
   * @return {object}
   *
   * @throws {NotFound}
   */


  static async findOneBySlug(slug, options = {}) {
    const story = await this.findOne({
      $or: [{
        "slug.short": slug
      }, {
        "slug.full": slug
      }]
    });
    (0, _invariant.default)(!story, _NotFound.default, "Can't find the story with slug: %s", slug);
    return this._tryConvert(story, options);
  }

  static async removeOne(viewer, story) {
    story = await this.findOneById(story, {
      toJS: false
    });
    (0, _invariant.default)(!story, _NotFound.default, "Can't find requested story.");
    (0, _invariant.default)(!story.isPublisher(viewer), _Forbidden.default, "Only the story publisher have an access to remove it.");
    story = await story.remove();
    return story.id;
  }
  /**
   * Get role name by the code.
   *
   * @param {number} code
   *
   * @return {string|undefined}
   *
   * @private
   */


  isPublisher(viewer) {
    return String(viewer) === String(this.publisher);
  }
  /**
   * @see Model#toJS
   */


  async toJS(options) {
    // TODO: Add a collaborators population
    const story = await super.toJS(options);

    if (!(0, _isEmpty.default)(this.collaborators)) {
      for (const [idx, collaborator] of this.collaborators.entries()) {
        this.collaborators[idx].role = this.__getRoleName(collaborator.role);
      }
    }

    return story;
  }

}, _temp), ((0, _applyDecoratedDescriptor2.default)(_class2, "_findById", [_selectFromGraphQLFields.default], Object.getOwnPropertyDescriptor(_class2, "_findById"), _class2), (0, _applyDecoratedDescriptor2.default)(_class2, "findMany", [_selectFromGraphQLFields.default], Object.getOwnPropertyDescriptor(_class2, "findMany"), _class2)), _class2)) || _class;

var _default = Story;
exports.default = _default;
//# sourceMappingURL=Story.js.map