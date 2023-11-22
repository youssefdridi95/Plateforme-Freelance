
export interface Env {
    backendUrl : string ,
    usersSignup :string,
    usersSignin :string,
    requestResetPwd : string,
    resetPwd : string , 
    roles : {
    userRole : string , // used in the signup (the role sent to the backend )
    user : string , //  (the role receied from the backend )

 // used in the add (the role sent to the backend )
    entAdmin : string,
    entRecruter : string,
    entEditor : string ,
    entEmployee : string ,

 //  (the role receied from the backend )
    entRoleAdmin: string,
    entRecruterRole : string,
    entEditorRole : string,
    entEmployeeRole :string ,
}
}