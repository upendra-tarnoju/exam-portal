import firebase from 'firebase/app';
import 'firebase/storage';

import ExaminerService from '../services/examinerApi';

let storage;
let examinerService = new ExaminerService();

examinerService.getSettings().then((res) => {
	let firebaseCredentials = res.data.settings.value;

	firebase.initializeApp(firebaseCredentials);

	storage = firebase.storage();
});

export { storage, firebase as default };
