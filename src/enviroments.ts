

export const environments= {

  
 backendUrl : "http://localhost:9090" ,
  webSocketBackendUrl : 'ws://localhost:9090/ws',

      // backendUrl : "http://192.168.195.70:9090" ,
    // backendUrl : "http://192.168.195.70:9092" ,
      // webSocketBackendUrl : 'ws://192.168.195.70:9090/ws',
    connectUser : '/user/connectUser',
    disConnectUser : '/api/auth/disconnectUser',
    chatList : '/api/chats/get/userId/',
    chat: '/api/chats/get/',
    username : '/user/get/',
    createChat : '/api/chats/createChat',
    markMessageSeen : '/api/chats/markMessagesAsSeen/',
<<<<<<< HEAD

    
    usersSignup :"/api/auth/signup",
    usersSignin :"/api/auth/signin",
   
    requestResetPwd : '/api/auth/forgot/sendEmail' ,
    resetPwd : '/api/auth/setPassword' , 
   
=======
 
   
    usersSignup :"/api/auth/signup",
    usersSignin :"/api/auth/signin",
   
    requestResetPwd : '/api/auth/forgot/sendEmail' ,
    resetPwd : '/api/auth/setPassword' ,
   
>>>>>>> amal
    verifcompte : '/api/auth/verifCompte',
    regenerateOtp : '/api/auth/regenerateOtp',
   
    getUserSkill: '/api/umanlink/profiles/individuals/all/by-skill',
   
   
    userProfil : "",
 
    cvBuild : "/api/umanlink/resumes/create-resume",
    getCv : "/api/umanlink/profiles/individuals/get-resume",
    updateCv : '/api/umanlink/resumes/update-resume',
    updateMainSkill : '/api/umanlink/profiles/individuals/update-mainskill',
    userCreateProfil : '/api/umanlink/profiles/individuals/create-profile-perso',
 
 
    addmploye : "/api/umanlink/gestion-entreprise/inviteEmployee" ,
    addemp :"/api/umanlink/gestion-entreprise/addEmployee",
    employer :"/api/umanlink/gestion-entreprise/getByEntreprise",
    entreprise:"/api/umanlink/profiles/entreprises/create-profile-entreprise",
    profilEntreprise:"/api/umanlink/profiles/entreprises/get-one/by-user",
    delete:"/api/umanlink/gestion-entreprise/deleteEmployee",
    update:"/api/umanlink/profiles/entreprises/update-Entreprise",  
    deleteCompte:"/api/umanlink/delete",
    //  (the role receied from the backend )
   
    editPost: '',
    addPost: '/api/umanlink/postes/create-post',
    deletePost: '/api/umanlink/postes/delete-one-by-id',
    getUserPost: '/api/umanlink/postes/all/by-user',
    getSkillPost: '/api/umanlink/postes/all/by-skill',
 
    getPostFilter: '',
    viewNumberEntreprise:'/api/umanlink/profiles/entreprises/update-Nombre De Vues',
    viewNumber:'/api/umanlink/profiles/individuals/update-Nombre De Vues',
    getFilePost: '/api/umanlink/postes/get-post-file',
    augnbrReact : '/api/umanlink/postes/Augmente-nombre-reacts',
    subnbrReact : '/api/umanlink/postes/Diminue-nombre-reacts',
    getUserProfil: '/api/umanlink/profiles/individuals/get-one/by-user',
    editUserProfil: '/api/umanlink/profiles/individuals/update-Talent',
     updatepassword: '/api/auth/updatePassword',
    roles: {
 
        userRole: "talent", // used in the signup (the role sent to the backend )
        user: "ROLE_TALENT", //  (the role receied from the backend )
 
        //  (the role receied from the bacupkend )
        entAdmin: 'ROLE_ENTREPRISE',
        entRecruter: 'ROLE_RECRUTER',
        entEditor: 'ROLE_EDITOR',
        entEmployee: 'ROLE_EMPLOYEE',
        // used in the add (the role sent to the backend )
        entRoleAdmin: 'entreprise',
        entRecruterRole: 'recruter',
        entEditorRole: 'editor',
        entEmployeeRole: 'employee',
    }
 
 
 
 
}