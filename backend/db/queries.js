const queries = {
	getData: async (model, query, projection, options) => {
		return model.find(query, projection, options);
	},

	findOne: async (model, query, projection, options) => {
		return model.findOne(query, projection, options);
	},

	create: async (model, data) => {
		return new model(data).save();
	},

	populateData: (model, query, projection, options, collectionOptions) => {
		return model
			.find(query, projection, options)
			.populate(collectionOptions)
			.exec();
	},

	countDocuments: (model, condition) => {
		return model.countDocuments(condition);
	},
};

module.exports = queries;
