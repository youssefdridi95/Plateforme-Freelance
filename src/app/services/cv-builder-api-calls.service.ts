import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { FormArray, FormGroup } from '@angular/forms';

@Injectable({
  providedIn: 'root'
})
export class CvBuilderApiCallsService {


 url =''
  constructor(private http:HttpClient) {}


  getCvSection(id:any,cvSection:string) {
    return this.http.get(this.url + '/'+cvSection+'/'+id).subscribe
    
}


  addExperiences(experiences :FormArray){

      for (let i = 0; i < experiences.length; i++) {
          this.http.post(this.url + '',experiences.at(i).value).subscribe({
            next: (v) => console.log(v),
            error: (e) => console.error(e),
            complete: () => console.info('complete') 
        })
        }
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


  addFormations(formations :FormArray){

    for (let i = 0; i < formations.length; i++) {
        this.http.post(this.url + '',formations.at(i).value).subscribe({
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

editCertifications(id:any ,certifications :FormArray){

  for (let i = 0; i < certifications.length; i++) {
      let data= new FormData();


      data.append('image',certifications.at(i).value['image'])
      data.append('imageFile',certifications.at(i).value['imageFile'])
      data.append('dateObtentien',certifications.at(i).value['dateObtentien'])
      data.append('desc',certifications.at(i).value['desc'])

      data.append('titre',certifications.at(i).value['titre'])
      data.append('niveau',certifications.at(i).value['niveau'])
      data.append('organisation',certifications.at(i).value['organisation'])



      this.http.put(this.url + '/----------/'+id,data).subscribe({
        next: (v) => console.log(v),
        error: (e) => console.error(e),
        complete: () => console.info('complete') 
    })
     
    }
}

addCompetences(competences: FormGroup) {
  // Assuming competences is the main FormGroup
  const principaleFormGroup = competences.get('competence.principale') as FormGroup;
  const secondaireFormArray = competences.get('competence.secondaire') as FormArray;

  // Post data for 'principale'
  this.http.post(this.url, principaleFormGroup.value)
    .subscribe({
      next: (v) => console.log(v),
      error: (e) => console.error(e),
      complete: () => console.info('complete')
    });

  // Post data for each control in 'secondaire' FormArray
  for (let i = 0; i < secondaireFormArray.length; i++) {
    this.http.post(this.url, secondaireFormArray.at(i).value)
      .subscribe({
        next: (v) => console.log(v),
        error: (e) => console.error(e),
        complete: () => console.info('complete')
      });
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