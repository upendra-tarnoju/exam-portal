# Exam portal

## Introduction
Its an online exam portal to track the students capabilites and test them through exams. This portal not only provides platform for students to take exam. It also provide intensive features to administer, monitor and grade exams on-line. The project has been made keeping in mind its reusability and friendlines. It provide efficient platform for both examiner and student,by enabling  examination to be taken online. 

## Technologies used
- React JS (Frontend is based on React JS)
- Node JS (Backend is based on Node JS)
- Mongo DB (Mongo DB is used as database)
- Express JS (Used as a framework for Node JS)

## User characterstics
### Admin
> The administrator is the main user of the system. Admin can approve or decline new examiners. He can view all details related to examiners, different exams created by examiners.
### Examiner
> Examiner have ability to create questions and its options and loaded into the software. Examiners will approve students for the particular examinations.
### Student
> The student would be able to logon to the system and take his/her examination. He can also check previous examination result. Student would get result immediately after giving examination.

## Modules
- **Dashboard module**- All the users can access this module. Admin can view all details of pending examiners and data about all the exams being taken in the form of graph. Examiner can view details about all created exams by him. Students can access this module for viewing all the taken examinations by him and view his performance in the form og graphs. 
- **Login module** - In this module, user can login by entering email Id and password.
- **Signup module** - This module can only be accessed by examiner, students cannot create their account by their own. It has to be created and approved by the respective examiner.
- **Examination module** - In this module, student can take exams and submits their answers. It provide limited time to answer the question. When the student starts the exam, timer will start automatically and show the student how much time is left. After the exam this module will be disabled automatically and result can be viewed immediately upon submission.

## Installation
> Following step must be followed for the correct working of the project

1) Git clone
2) Move inside the **frontend** folder and perform following commands
```
- npm install
```
This will install all dependencies for react JS.

3) Move inside the **backend** folder and perform following command
```
- npm install
```

## Configurations
> Move inside **config** folder and create the **js** file with the file name as **credentials.js**. After creating file, add the following code:-
```
let email = 'Type your gmail address';
let password = 'Type your gmail password';
module.exports = {
  sender: email,
  password: password,
}
```
### Note
> Gmail Id and password is requried for sending mails in the project. If still sending emails are not working then use the following method

```
- Login to gmail account.
- Go to [link](https://www.google.com/settings/security/lesssecureapps)
- Set the Access for less secure apps setting to **enable**.
```
