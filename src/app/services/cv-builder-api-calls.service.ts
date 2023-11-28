import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { FormArray, FormGroup } from '@angular/forms';
import { Env } from '../env';
import { environments } from 'src/enviroments';

@Injectable({
  providedIn: 'root'
})
export class CvBuilderApiCallsService {

private env:Env =environments as Env

private  url =''
private cvBuild =''
  constructor(private http:HttpClient) {
    this.url=this.env.backendUrl
    this.cvBuild=this.env.cvBuild
  }



 build(cv:any){
console.log(cv);

  const params = new HttpParams()
  .set('profileId', '6565c6c2b699e545cad68025')

// Make the API call with parameters

const headers = new HttpHeaders({ 'Content-Type': 'application/json' });

  return this.http.post(this.url  + this.cvBuild  ,cv,{params,headers});

 }







  getCvSection(id:any,cvSection:string) {
    return this.http.get(this.url + '/'+cvSection+'/'+id).subscribe
    
}


 


  editExperiences(id:any ,experiences :FormArray){

    for (let i = 0; i < experiences.length; i++) {
        this.http.put(this.url + '/----------/'+id,experiences.at(i).value).subscribe({
          next: (v) => console.log(v),
          error: (e) => console.error(e),
          complete: () => console.info('complete') 
      })
      }
}





editFormations(id:any ,formations :FormArray){

  for (let i = 0; i < formations.length; i++) {
      this.http.put(this.url + '/---------/'+id,formations.at(i).value).subscribe({
        next: (v) => console.log(v),
        error: (e) => console.error(e),
        complete: () => console.info('complete') 
    })
     
    }
}



editCertifications(id:any ,certifications :FormArray){

  for (let i = 0; i < certifications.length; i++) {
      let data= new FormData();


      data.append('image',certifications.at(i).value['image'])
      data.append('imageFile',certifications.at(i).value['imageFile'])
      data.append('dateObtentien',certifications.at(i).value['dateObtentien'])
      data.append('titre',certifications.at(i).value['titre'])




      this.http.put(this.url + '/----------/'+id,data).subscribe({
        next: (v) => console.log(v),
        error: (e) => console.error(e),
        complete: () => console.info('complete') 
    })
     
    }
}





editCompetences(id:any ,competences :FormArray){

  const principaleFormGroup = competences.get('competence.principale') as FormGroup;
  const secondaireFormArray = competences.get('competence.secondaire') as FormArray;

  // Post data for 'principale'
  this.http.put(this.url +'/---/'+id, principaleFormGroup.value)
    .subscribe({
      next: (v) => console.log(v),
      error: (e) => console.error(e),
      complete: () => console.info('complete')
    });

  // Post data for each control in 'secondaire' FormArray
  for (let i = 0; i < secondaireFormArray.length; i++) {
    this.http.put(this.url +'/---/'+id, secondaireFormArray.at(i).value)
      .subscribe({
        next: (v) => console.log(v),
        error: (e) => console.error(e),
        complete: () => console.info('complete')
      });
  }
}
}
