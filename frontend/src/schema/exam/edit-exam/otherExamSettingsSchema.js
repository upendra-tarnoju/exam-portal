import * as Yup from 'yup';

const schema = Yup.object({
	examSwitchingAttempts: Yup.string().required('Attempts are required'),
	updatePreviousQuestion: Yup.boolean().required('Required'),
	shuffleQuestions: Yup.boolean().required('Required'),
});

export default schema;
