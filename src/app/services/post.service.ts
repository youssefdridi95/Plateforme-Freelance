import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Env } from '../env';
import { environments } from 'src/enviroments';
import { catchError, map } from 'rxjs/operators';
import { Observable } from 'rxjs';

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
    this.getFilePost = this.env.getFilePost
    this.getpostFilt = this.env.getPostFilter
    this.augnbrReact = this.env.augnbrReact
   }
  

   private url 
   private addPost 
   private editPost  
   private deletePost  
   private getUserPost 
   private getSkillPost 
   private getFilePost 
   private getpostFilt 
   private augnbrReact

  // function signup api call
add(data:any ,params: any){
  
  return this.http.post(this.url + this.addPost,data,{params});
}

edit(data: any){
  return this.http.put(this.url + this.editPost,data);
}
// delete(data: any){
//   return this.http.post(this.url + this.deletePost,data);
// }
delete(postId : string): Observable<any> {
  let params = new HttpParams();
  params = params.append('postId', postId );
  return this.http.delete(this.url+this.deletePost,{params});
}

getPostsBySkill(skill: any  ){
  console.log(skill);
  
  let params = new HttpParams().set('skill', skill)

  return this.http.get(this.url + this.getSkillPost,{params});

} 
getUserPosts(data: any  ){
  let params = new HttpParams().set('userId', data)

  return this.http.get(this.url + this.getUserPost,{params});

}
getFile(URI: any): Observable<Blob> {
  const params = new HttpParams().set('fileDownloadUriReport', "/Postes/65675f9f74da756d91ababa0/2023-11-30/2023-11-30 101724 325Z/Untitled.png//");
  const headers = new HttpHeaders().set('Accept', 'image/png'); // Adjust content type based on your response

  return this.http.get(this.url + this.getFilePost, {
    params,
    responseType: 'blob',
    headers,
  });
}

getPostFilter(skill: any  ){
  console.log(skill);
  
  let params = new HttpParams().set('skill', skill)

  return this.http.get(this.url + this.getpostFilt,{params});

} 
addmnbrReact(idprofil  : any , idVisiteur : any ,  postId : any ){
  
  let params = new HttpParams()
  .set('profileId', idprofil)
  .set('idVisiteur', idVisiteur )
  .set('postId', postId  )

  console.log(params);

 return this.http.put(this.url + this.augnbrReact,{},{params});

}


}
