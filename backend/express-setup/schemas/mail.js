const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const mail = new Schema({
	sender: { type: mongoose.Types.ObjectId, required: true },
	receiver: [{ required: true, type: mongoose.Types.ObjectId }],
	createdDate: { type: Number, default: Date.now },
	modifiedDate: { type: Number, default: Date.now },
	subject: { type: String },
	body: { type: String, required: true },
});

module.exports = mongoose.model('mail', mail);
