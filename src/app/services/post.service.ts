import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Env } from '../env';
import { environments } from 'src/enviroments';

@Injectable({
  providedIn: 'root'
})
export class PostService {

  private env :Env  =environments as Env

  constructor(private http: HttpClient) {
    this.url =this.env.backendUrl;
    this.addPost = this.env.addPost
    this.editPost = this.env.editPost
    this.deletePost = this.env.deletePost
    this.getUserPost = this.env.getUserPost
    this.getSkillPost = this.env.getSkillPost
   }
  

   private url 
   private addPost 
   private editPost  
   private deletePost  
   private getUserPost 
   private getSkillPost 



  // function signup api call
add(data:any ,params: any){
  
  return this.http.post(this.url + this.addPost,data,{params});
}

edit(data: any){
  return this.http.put(this.url + this.editPost,data);
}
delete(data: any){
  return this.http.post(this.url + this.deletePost,data);
}

getUserPosts(data: any){
  return this.http.post(this.url + this.getUserPost,data);
}


getSkillsPosts(data: any){
  return this.http.post(this.url + this.getSkillPost,data);
}
}
