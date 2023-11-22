

export const environments= {
 
    backendUrl : "http://192.168.195.26:9090" ,
    usersSignup :"/auth/signup",
    usersSignin :"/auth/signin",
    requestResetPwd : '/auth/forgot/sendEmail' ,
    resetPwd : '/auth/setPassword' , 
    verifcompte : '/auth/verifCompte',
    regenerateOtp : '/auth/regenerateOtp',
    roles : {
      
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
}
}; 