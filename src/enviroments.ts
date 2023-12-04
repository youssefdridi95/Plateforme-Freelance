

export const environments= {
 
     backendUrl : "http://localhost:9090" ,
//    backendUrl : "http://192.168.195.26:9090" ,
    
    usersSignup :"/auth/signup",
    usersSignin :"/auth/signin",
   
    requestResetPwd : '/auth/forgot/sendEmail' ,
    resetPwd : '/auth/setPassword' , 
   
    verifcompte : '/auth/verifCompte',
    regenerateOtp : '/auth/regenerateOtp',
   
  
   
   
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
    update:"",  
   
    //  (the role receied from the backend )
   
    editPost: '',
    addPost: '/api/umanlink/postes/create-post',
    deletePost: '/api/umanlink/postes/delete-one-by-id',
    getUserPost: '/api/umanlink/postes/all/by-user',
    getSkillPost: '',


    getFilePost: '/api/umanlink/postes/get-post-file',


    getUserProfil: '/api/umanlink/profiles/individuals/get-one/by-user',

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