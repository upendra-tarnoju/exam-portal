import { storage } from '../config/firebaseConfig';
import { v4 as uuidv4 } from 'uuid';

const uploadQuestionImage = async (file) => {
	let imageId = uuidv4();

	return new Promise((resolve, reject) => {
		let storageRef = storage.ref(`questions/${imageId}`);
		let uploadTask = storageRef.put(file);

		uploadTask.on(
			'state_changed',
			(snapshot) => {},
			(error) => {
				reject(error);
			},
			() => {
				storage
					.ref('questions')
					.child(imageId)
					.getDownloadURL()
					.then((url) => {
						resolve(url);
					});
			}
		);
	});

	// let uploadTask = storage.ref(`questions/${imageId}`).put(file);
	// uploadTask.on(
	// 	'state_changed',
	// 	(snapshot) => {},
	// 	(error) => {},
	// 	() => {
	// 		storage
	// 			.ref('questions')
	// 			.child(imageId)
	// 			.getDownloadURL()
	// 			.then((url) => {
	// 				this.setState({ image: url });
	// 				this.props.setQuestionImage(url);
	// 			});
	// 	}
	// );
};

export { uploadQuestionImage };
