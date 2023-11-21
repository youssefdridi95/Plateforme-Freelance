export const environment = {
    backendUrl : "http://localhost:9090" ,
    usersSignup :"/auth/signup",
    usersSignin :"/auth/signin",
    requestResetPwd : '/auth/sendEmail' ,
    resetPwd : '/auth/setPassword' , 
};


export const roles = {
    userRole : "talent" , // used in the signup (the role sent to the backend )
    user : "ROLE_TALENT" , //  (the role receied from the backend )

 // used in the add (the role sent to the backend )
    entAdmin : 'ROLE_ENTREPRISE',
    entRecruter : 'ROLE_RECRUTER',
    entEditor : 'ROLE_EDITOR' ,
    entEmployee : 'ROLE_EMPLOYEE' ,

 //  (the role receied from the backend )
    entRoleAdmin: 'entreprise',
    entRecruterRole : 'recruter',
    entEditorRole : 'editor' ,
    entEmployeeRole :'employee' ,
};
