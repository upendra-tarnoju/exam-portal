const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const setting = new Schema({
	key: { type: String, required: true },
	value: { type: Object, required: true },
	createdDate: { type: Number, default: Date.now },
	modifiedDate: { type: Number, default: Date.now },
	userId: { type: mongoose.Types.ObjectId, required: true },
});

module.exports = mongoose.model('setting', setting);
