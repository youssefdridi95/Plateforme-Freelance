
export interface Env {
    backendUrl : string ,
    webSocketBackendUrl : string ,
    connectUser : string,
    disConnectUser : string,

    chatList : string,
    chat: string,

    username : string,
    createChat : string,
    markMessageSeen : string,

    usersSignup :string,
    usersSignin :string,
    requestResetPwd : string,
    resetPwd : string , 
    regenerateOtp : string ,
    verifcompte : string ,
    addPost  : string ,
    editPost  : string ,
    deletePost  : string ,
    getUserPost : string ,
    getSkillPost : string ,
    cvBuild : string ,
      getCv : string,
      updateCv : string
      updateMainSkill : string ,
    userCreateProfil : string,
    getUserProfil : string
    editUserProfil : string, 
     updatepassword : string,
     getUserSkill : string,
    addmploye:string,
    addemp:string,
    employer:string,
    entreprise:string;
    deleteCompte:string;
    profilEntreprise:string;
    delete:string;
    getFilePost : string,
    update:string,
    getPostFilter: string,
    viewNumber: string,
    viewNumberEntreprise : string,
    augnbrReact : string,
    roles : {
    userRole : string , // used in the signup (the role sent to the backend )
    user : string , //  (the role receied from the backend )
 // used in the add (the role sent to the backend )
    entAdmin : string,
    entRecruter : string,
    entEditor : string ,
    

 //  (the role receied from the backend )
    entRoleAdmin: string,
    entRecruterRole : string,
    entEditorRole : string,
    
}
}
