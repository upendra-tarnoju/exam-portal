const multer = require('multer');
const path = require('path');
const crypto = require('crypto');

const storage = multer.diskStorage({
	destination: function (req, file, cb) {
		let pathName = `${path.dirname(require.main.filename)}/uploads/`;
		cb(null, pathName);
	},
	filename: function (req, file, cb) {
		let buf = crypto.randomBytes(16);
		let filename = buf.toString('hex') + path.extname(file.originalname);
		cb(null, filename);
	},
});
const upload = multer({ storage: storage });

module.exports = { upload: upload };
