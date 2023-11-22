

export const environments= {
 
    backendUrl : "http://localhost:9090" ,
    usersSignup :"/auth/signup",
    usersSignin :"/auth/signin",
    requestResetPwd : '/auth/sendEmail' ,
    resetPwd : '/auth/setPassword' , 
  
  
    roles : {
      
    userRole : "talent" , // used in the signup (the role sent to the backend )
    user : "ROLE_TALENT" , //  (the role receied from the backend )
    
    //  (the role receied from the backend )
    entAdmin : 'ROLE_ENTREPRISE',
    entRecruter : 'ROLE_RECRUTER',
    entEditor : 'ROLE_EDITOR' ,
    entEmployee : 'ROLE_EMPLOYEE' ,
    
    // used in the add (the role sent to the backend )
    entRoleAdmin: 'entreprise',
    entRecruterRole : 'recruter',
    entEditorRole : 'editor' ,
    entEmployeeRole :'employee' ,
}
}; 