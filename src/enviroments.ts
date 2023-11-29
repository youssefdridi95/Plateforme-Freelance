

export const environments= {
 
    backendUrl : "http://192.168.195.29:9090" ,
   //backendUrl : "http://localhost:9090" ,
    
    usersSignup :"/auth/signup",
    usersSignin :"/auth/signin",
   
    requestResetPwd : '/auth/forgot/sendEmail' ,
    resetPwd : '/auth/setPassword' , 
   
    verifcompte : '/auth/verifCompte',
    regenerateOtp : '/auth/regenerateOtp',
   
    addPost  : '/api/umanlink/postes/create-post' ,
    editPost  : '' ,
    deletePost  : '' ,
    getUserPost : '' ,
    getSkillPost : '' ,
   
   
   
   
    userProfil : "",

    cvBuild : "/api/umanlink/resumes/create-resume",
    userCreateProfil : '/api/umanlink/profiles/individuals/create-profile-perso',

    getUserProfil : '/api/umanlink/user/info/profile',

    addmploye : "/api/umanlink/gestion-entreprise/inviteEmployee" ,
    addemp :"/api/umanlink/gestion-entreprise/addEmployee",
    employer :"/api/umanlink/gestion-entreprise/getByEntreprise",
    entreprise:"/api/umanlink/profiles/entreprises/create-profile-entreprise",
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
}