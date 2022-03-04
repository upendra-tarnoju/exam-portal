const multer = require('multer');
const path = require('path');
const crypto = require('crypto');
const GridFsStorage = require('multer-gridfs-storage');

const physicalDBStorage = multer.diskStorage({
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

const url = `mongodb://${process.env.MONGO_HOSTNAME}:${process.env.MONGO_PORT}/${process.env.MONGO_DB}`;

const imageDBStorage = new GridFsStorage({
	url,
	file: async (req, file) => {
		const buf = crypto.randomBytes(16);
		if (
			file.mimetype === 'image/jpeg' ||
			file.mimetype === 'image/jpg' ||
			file.mimetype === 'image/png'
		) {
			const filename = buf.toString('hex') + path.extname(file.originalname);
			return {
				filename: filename,
				bucketName: 'images',
			};
		}
	},
});

const upload = multer({ storage: imageDBStorage });
const physicalUpload = multer({ storage: physicalDBStorage });

module.exports = { upload: upload, physicalUpload };
