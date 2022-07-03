const Datastore = require("nedb-promises");
const Ajv = require("ajv");

const ajv = new Ajv({
  allErrors: true,
  useDefaults: true,
});

const schema = {
  type: "object",
  properties: {
    name: {
      type: "string",
      maxLength: 32,
    },
    api: {
      type: "object",
      properties: {
        baseURL: {
          type: "string",
        },
        version: {
          type: "string",
          nullable: true,
          default: null,
        },
      },
    },
    routes: {
      type: "array",
      default: [],
    },
    about: {
      type: "string",
    },
    lastVisited: {
      type: "number",
      nullable: true,
      default: null,
    },
  },
  required: ["name", "api"],
  additionalProperties: false,
};

const schemaValidator = ajv.compile(schema);

const store = Datastore.create({
  filename: "./db/workspaces.db",
  timestampData: true,
});

module.exports.validate = schemaValidator;

module.exports.create = (data) => {
  const isValid = this.validate(data);
  if (!isValid) throw Error("Invalid Schema");
  return store.insert(data);
};

module.exports.getById = (_id) => store.findOne({ _id }).exec();

module.exports.findOne = (query) => store.findOne(query).exec();

module.exports.getAll = () => store.find();
