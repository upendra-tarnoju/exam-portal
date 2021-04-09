let courses = [
	{
		name: 'AEI',
		description: 'Applied Electronics and Instrumentation Engineering',
	},
	{ name: 'AGR', description: 'Agricultural Engineering' },
	{ name: 'ANE', description: 'Aeronautical Engineering' },
	{ name: 'AUT', description: 'Automobile Engineering' },
	{ name: 'BA', description: 'Bachelor of Arts' },
	{ name: 'BAE', description: 'Bachelor of Arts in Education' },
	{ name: 'BAg', description: 'Bachelor of Agriculture' },
	{ name: 'BAM', description: 'Bachelor of Applied Mathematics' },
	{ name: 'BAMS', description: 'Bachelor of Ayurvedic Medicine and Surgery' },
	{ name: 'BArch', description: 'Bachelor of Architecture' },
	{
		name: 'BASLP',
		description: 'Bachelor of Audiology & Speech Language Pathology',
	},
	{ name: 'BBA', description: 'Bachelor of Business Administration' },
	{ name: 'BBM', description: 'Bachelor of Business Management' },
	{ name: 'BCA', description: 'Bachelor of Computer Applications' },
	{ name: 'BCE', description: 'Bachelor of Civil Engineering' },
	{ name: 'BChE', description: 'Bachelor of Chemical Engineering' },
	{ name: 'BCL', description: 'Bachelor of Canon Law' },
	{ name: 'BCVT', description: 'Bachelor of Cardiovascular technology' },
	{ name: 'BD', description: 'Bachelor of Divinity' },
	{ name: 'BDS', description: 'Bachelor of Dental Surgery' },
	{ name: 'BCom', description: 'Bachelor of Commerce' },
	{ name: 'BHA', description: 'Bachelor in Hotel Administration' },
	{ name: 'BE', description: 'Bachelor of Engineering' },
	{ name: 'BEE', description: 'Bachelor of Electrical Engineering' },
	{ name: 'BEd', description: 'Bachelor of Education' },
	{ name: 'BEE', description: 'Bachelor of Electrical Engineering' },
	{
		name: 'BEMS',
		description: 'Bachelor of Electrohomeopathy Medicine and Surgery',
	},
	{ name: 'BF', description: 'Bachelor of Forestry' },
	{ name: 'BFA', description: 'Bachelor of Fine Arts' },
	{ name: 'BFS', description: 'Bachelor of Fishery Science' },
	{ name: 'BFT', description: 'Bachelor of Fashion Technology' },
	{ name: 'BHA', description: 'Bachelor in Hotel Administration' },
	{ name: 'BHM', description: 'Bachelor in Hotel Management' },
	{
		name: 'BHMCT',
		description: 'Bachelor Degree in Hotel Management & Catering Technology',
	},
	{
		name: 'BHMS',
		description: 'Bachelor of Homoeopathic Medicine and Surgery',
	},
	{ name: 'BIO', description: 'BioTechnology' },
	{ name: 'BJ', description: 'Bachelor of Journalism' },
	{ name: 'BLISc', description: 'Bachelor of Library Information Science' },
	{ name: 'BLit', description: 'Bachelor of Literature' },
	{ name: 'BLitt', description: 'Bachelor of Letters' },
	{
		name: 'BLS',
		description: 'Bachelor of Liberal Studies or Bachelor of Library Science',
	},
	{ name: 'BM', description: 'Bachelor of Medicine' },
	{ name: 'BME', description: 'BioMedical Engineering' },
	{ name: 'BMS', description: 'Bachelor of Marine Science' },
	{ name: 'BMS', description: 'Bachelor of Management Studies' },
	{ name: 'BN', description: 'Bachelor of Nursing' },
	{ name: 'BOPT', description: 'Bachelor of Optometry' },
	{ name: 'BOT', description: 'Bachelor of Occupational Therapy' },
	{ name: 'BPA', description: 'Bachelor of Performing Arts' },
	{ name: 'BPE', description: 'Bachelor of Physical Education' },
	{ name: 'BMLT', description: 'Bachelor of Medical Lab Technology' },
	{ name: 'BPEd', description: 'Bachelor of Physical Education' },
	{ name: 'BPEd', description: 'Bachelor of Physical Education' },
	{ name: 'BPharm', description: 'Bachelor of Pharmacy' },
	{ name: 'BPT', description: 'Bachelor of Physiotherapy' },
	{ name: 'BRE', description: 'Bachelor of Religious Education' },
	{
		name: 'BRIT',
		description: 'Bachelor of Radio-diognosis & Imaging Technology',
	},
	{ name: 'BS', description: 'Bachelor of Science' },
	{ name: 'BSc', description: 'Bachelor of Science' },
	{ name: 'BSW', description: 'Bachelor of Social Work' },
	{ name: 'BT', description: 'Bachelor of Tourism' },
	{ name: 'BSEd', description: 'Bachelor of Science in Education' },
	{ name: 'BSMS', description: 'Bachelor of Siddha Medicine and Surgery' },
	{ name: 'BTech', description: 'Bachelor of Technology' },
	{ name: 'BTHM', description: 'Bachelor of Tourism and Hotel Management' },
	{ name: 'BTS', description: 'Bachelor of Tourism' },
	{ name: 'BTTM', description: 'Bachelor of Travel Tourism Management' },
	{ name: 'BUMS', description: 'Bachelor of Unani Medicine & Surgery' },
	{ name: 'BVSc', description: 'Bachelor of Veterinary and Animal Sciences' },
	{ name: 'CEE', description: 'Civil Environmental Engineering' },
	{ name: 'CAB', description: 'Commercial Agricultural  and  Business Mgmt' },
	{ name: 'CE', description: 'Civil Engineer' },
	{ name: 'CEP', description: 'Continuing Education Programme' },
	{ name: 'CER', description: 'Chemical (Ceramic) Technology' },
	{ name: 'ChE', description: 'Chemical Enginee' },
	{ name: 'CHE', description: 'Chemical Engineering' },
	{ name: 'CIV', description: 'Civil Engineering' },
	{ name: 'CPE', description: 'Chemical Petro Engineering' },
	{ name: 'CSE', description: 'Computer Science and Engineering' },
	{ name: 'CSS', description: 'Computer Science and Systems Engineering' },
	{ name: 'DAS', description: 'Doctor of Applied Science' },
	{ name: 'ECE', description: 'Electronics and Communication Engineering' },
	{ name: 'ECM', description: 'Electronics and Computer Engineering' },
	{ name: 'ECS', description: 'Electronics Control Systems Engineering' },
	{ name: 'EdD', description: 'Doctor of Education' },
	{ name: 'EE', description: 'Electrical Engineer' },
	{ name: 'EEE', description: 'Electrical and Electronics Engineering' },
	{ name: 'EIE', description: 'Electronics and Instrumentation Engineering' },
	{ name: 'EM', description: 'Engineer of Mines' },
	{ name: 'EMet', description: 'Engineer of Metallurgy' },
	{ name: 'ETM', description: 'Electrnoics and Telematics' },
	{ name: 'FDS', description: 'Food Science' },
	{ name: 'FPT', description: 'Food Processing Technology' },
	{ name: 'FSP', description: 'Facilities and Services Planning' },
	{ name: 'GIN', description: 'Geoinformatics' },
	{ name: 'GNM', description: 'General Nursing' },
	{ name: 'ICE', description: 'Instrumentation and Control Engineering' },
	{ name: 'IE', description: 'Industrial Engineer or Industrial Engineering' },
	{ name: 'INF', description: 'Information Technology' },
	{ name: 'IPE', description: 'Industrial Production Engineering' },
	{ name: 'IST', description: 'Instrumentation Engineering and Technology' },
	{
		name: 'LLB',
		description: 'Literally Legum Baccalaureus (Bachelor of Laws)',
	},
	{ name: 'LLB', description: 'Bachelor of Laws' },
	{ name: 'LLM', description: 'Latin Legum Magister (Master of Laws)' },
	{ name: 'MA', description: 'Master of Arts' },
	{ name: 'MAeroE', description: 'Master of Aeronautical Engineering' },
	{ name: 'MArch', description: 'Master of Architecture' },
	{
		name: 'MASLP',
		description: 'Master of Audiology & Speech Language Pathology',
	},
	{ name: 'MAT', description: 'Management Aptitude Test' },
	{ name: 'MBA', description: 'Master of Business Administration' },
	{ name: 'MBBS', description: 'Bachelor of Medicine, Bachelor of Surgery' },
	{ name: 'MCA', description: 'Master of Computer Applications' },
	{
		name: 'MCE',
		description: 'Master of Christian Education or Master of Civil Engineering',
	},
	{ name: 'MCh', description: 'Master of Chirurgiae' },
	{ name: 'MCI', description: 'Medical Council of India' },
	{ name: 'MCJ', description: 'Master of Communication & Journalism' },
	{ name: 'MCom', description: 'Master of Commerce' },
	{ name: 'MCS', description: 'Master of Computer Science' },
	{ name: 'MCT', description: 'Mechanical (Mechtronics) Engineering' },
	{ name: 'MD', description: 'Doctor of Medicine' },
	{ name: 'MDiv', description: 'Master of Divinity' },
	{ name: 'MDS', description: 'Master of Dental Surgery' },
	{ name: 'ME', description: 'Master of Engineering' },
	{ name: 'ME', description: 'Master of Engineering' },
	{ name: 'MEC', description: 'Mechanical Engineering' },
	{ name: 'MEd', description: 'Master of Education' },
	{ name: 'MEd', description: 'Master of Education' },
	{ name: 'MEng', description: 'Master of Engineering' },
	{ name: 'MET', description: 'Metallurgical Engineering' },
	{ name: 'MFA', description: 'Master of Fine Arts' },
	{ name: 'MHA', description: 'Master of Hospital Administration' },
	{ name: 'MHRM', description: 'Master of Human Resources Management' },
	{ name: 'MIN', description: 'Mining Engineering' },
	{ name: 'MLA', description: 'Modern Library Association' },
	{ name: 'MLISc', description: 'Master of Library and Information Science' },
	{ name: 'MLitt', description: 'Master of Letters' },
	{ name: 'MLL', description: 'Master of Laws' },
	{ name: 'MLS', description: 'Master of Library Science' },
	{ name: 'MLT', description: 'Medical Laboratory Technician' },
	{ name: 'MM', description: 'Master of Music' },
	{
		name: 'MME',
		description:
			'Master of Mechanical Engineering or Master of Music Education',
	},
	{ name: 'MME', description: 'Mining Machinery Engineering' },
	{ name: 'MMH', description: 'Master of Management in Hospitality' },
	{ name: 'MMT', description: 'Metallurgy and Material Technology' },
	{ name: 'MMus', description: 'Master of Music' },
	{ name: 'MN', description: 'Master of Nursing' },
	{ name: 'MOT', description: 'Master of Occupational Therapy' },
	{ name: 'MPA', description: 'Master of Performing Arts' },
	{ name: 'MPEd', description: 'Master of Physical Education' },
	{ name: 'MPharm', description: 'Master of Pharmacy' },
	{ name: 'MPhil', description: 'Master of Philosophy' },
	{ name: 'MPT', description: 'Master of Physical Therapy' },
	{ name: 'MRE', description: 'Master of Religious Education' },
	{ name: 'MS', description: 'Master of Science' },
	{ name: 'MSc', description: 'Master of Science' },
	{ name: 'MSW', description: 'Master of Social Work' },
	{ name: 'MTA', description: 'Master of Tourism Application' },
	{ name: 'MTech', description: 'Master of Engineering' },
	{ name: 'MTh', description: 'Master of Theology' },
	{ name: 'MVSc', description: 'Master of Veterinary and Animal Sciences' },
	{ name: 'NMA', description: 'Naval Architecture and Marine Engineering' },
	{ name: 'OD', description: 'Doctor of Optometry' },
	{ name: 'PET', description: 'Petroleum Technology' },
	{ name: 'PG', description: 'Post Graduate' },

	{
		name: 'PGDAHS',
		description:
			'Post Graduate Diploma in Clinical Social Work and Counseling Practice',
	},
	{
		name: 'PGDIT',
		description: 'Post Graduate Diploma in Information Technology',
	},
	{
		name: 'PGDLAN',
		description: 'Post Graduate Diploma in Library Automation and Networking',
	},
	{ name: 'PharmD', description: 'Doctor of Pharmacy' },
	{ name: 'PhB', description: 'Bachelor of Philosophy' },
	{ name: 'PhD', description: 'Doctorate in Philosophy' },
	{ name: 'SB', description: 'Bachelor of Science' },
	{ name: 'ScD', description: 'Doctor of Science' },
	{
		name: 'SJD',
		description: 'Doctor of Juridical Science or Doctor of the Science of Law',
	},
	{ name: 'SScD', description: 'Doctor of Social Science' },
	{ name: 'STB', description: 'Bachelor of Sacred Theology' },
	{ name: 'STD', description: 'Doctor of Sacred Theology' },
	{ name: 'STM', description: 'Master of Sacred Theology' },
	{ name: 'TEXTEX', description: 'Textile Technology' },
	{ name: 'TGT', description: 'Trained Graduate Teacher' },
	{ name: 'ThB', description: 'Bachelor of Theology' },
	{ name: 'ThD', description: 'Doctor of Theology' },
	{ name: 'ThM', description: 'Master of Theology' },
	{ name: 'TTC', description: 'Teachers Training Cours' },
];

module.exports = courses;
