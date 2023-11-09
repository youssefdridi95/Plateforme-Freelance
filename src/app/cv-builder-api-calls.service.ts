import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { FormArray } from '@angular/forms';

@Injectable({
  providedIn: 'root'
})
export class CvBuilderApiCallsService {


 url =''
  constructor(private http:HttpClient) {}

  addExperiences(experiences :FormArray){

      for (let i = 0; i < experiences.length; i++) {
          this.http.post(this.url + '',experiences.at(i)).subscribe({
            next: (v) => console.log(v),
            error: (e) => console.error(e),
            complete: () => console.info('complete') 
        })
          console.log('----------------------------------')
          console.log(experiences.at(i).value)
        }
  }


  addFormations(formations :FormArray){

    for (let i = 0; i < formations.length; i++) {
        this.http.post(this.url + '',formations.at(i)).subscribe({
          next: (v) => console.log(v),
          error: (e) => console.error(e),
          complete: () => console.info('complete') 
      })
       
      }
}

addCertifications(certifications :FormArray){

  for (let i = 0; i < certifications.length; i++) {
      let data= new FormData();


      data.append('image',certifications.at(i).value['image'])
      data.append('imageFile',certifications.at(i).value['imageFile'])
      data.append('dateObtentien',certifications.at(i).value['dateObtentien'])
      data.append('desc',certifications.at(i).value['desc'])

      data.append('titre',certifications.at(i).value['titre'])
      data.append('niveau',certifications.at(i).value['niveau'])
      data.append('organisation',certifications.at(i).value['organisation'])



      this.http.post(this.url + '',data).subscribe({
        next: (v) => console.log(v),
        error: (e) => console.error(e),
        complete: () => console.info('complete') 
    })
     
    }
}

addCompetences(competences :FormArray){

  for (let i = 0; i < competences.length; i++) {
      this.http.post(this.url + '',competences.at(i)).subscribe({
        next: (v) => console.log(v),
        error: (e) => console.error(e),
        complete: () => console.info('complete') 
    })
      console.log('----------------------------------')
      console.log(competences.at(i).value)
    }
}
}
