
export interface Env {
    backendUrl : string ,
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
    addmploye:string,
    addemp:string,
    employer:string,
    entreprise:string;
    profilEntreprise:string;
    delete:string;
    getFilePost : string,
    update:string,
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
