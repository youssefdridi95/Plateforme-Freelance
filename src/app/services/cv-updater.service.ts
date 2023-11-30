

import {  Injectable } from '@angular/core';
import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';

@Injectable({
  providedIn: 'root'
})
export class CvUpdaterService {

  constructor(){
  }
   cvForm:any = new FormGroup({
    experience: new FormArray([]),
    formation: new FormArray([]),
    certification: new FormArray([]),
    competence: new FormGroup({
      principale: new FormGroup({
        nom: new FormControl( "", [Validators.required]),
        niveau: new FormControl("", [Validators.required]),
      }),
      secondaire: new FormArray([]),
      langue: new FormArray([]),
    }),

    
  });


  createCvForm(cv: any) {
    const experiences = cv.experiences || [];
    const formations = cv.formations || [];
    const competences = cv.competences ;
    const certifications = cv.certifications || [];
    interface Competence {
      id: string;
      type: string;
      title: string;
      niveau: string;
      timestamp: string;
  }

    let originalCompetences: Competence[] =competences

    const competenceFirstList: Competence= originalCompetences[0];
  
     originalCompetences.shift();
    const competenceLangList: Competence[] = originalCompetences.filter(competence => competence.type === "COMPETENCE_LANG");
      const competenceTechList: Competence[] = originalCompetences.filter(competence => competence.type === "COMPETENCE_TECH");
      
  

    const competenceSecondControls = competenceTechList.map((item: any) => this.competence(item));
    const langueControls = competenceLangList.map((item: any) => this.competence(item));

    const experienceControls = experiences.map((item: any) => this.experience(item));
    const formationControls = formations.map((item: any) => this.formation(item));
    const certificationControls = certifications.map((item: any) => this.certification(item));
  
    this.cvForm = new FormGroup({
      experience: new FormArray(experienceControls),
      formation: new FormArray(formationControls),
      certification: new FormArray(certificationControls),
      competence: new FormGroup({
        principale: new FormGroup({
          nom: new FormControl(competenceFirstList.title || "", [Validators.required]),
          niveau: new FormControl(competenceFirstList.niveau || "", [Validators.required]),
          id: new FormControl(competenceFirstList.id || "", [Validators.required]),
        }),
        secondaire: new FormArray(competenceSecondControls),
       langue: new FormArray(langueControls),
      }),
    
    });
  
    
  }

  experience (exp:any={company :'',position:'',localisation:'',debut :'',fin:'',employementType:'',id:''}){ 
    return new FormGroup({
    societe : new FormControl (exp.company,[Validators.required]),
    post : new FormControl (exp.position,[Validators.required]),
    employementType : new FormControl (exp.employementType,[Validators.required]),
    localisation : new FormControl (exp.localisation,[Validators.required]),
    debut : new FormControl (exp.debut,[Validators.required]),
    fin : new FormControl (exp.fin),
    id : new FormControl (exp.id)
  })
}

  formation(form:any={school :'',degree:'',date :'',id:''}){ 
    return new FormGroup({
      institut : new FormControl (form.school,[Validators.required]),
      id : new FormControl (form.id,[Validators.required]),
    diploma : new FormControl (form.degree,[Validators.required]),
    dateObtentien : new FormControl (form.date,[Validators.required]),
    
  })}

  certification(cert:any={titre:'',date :'',link:'',id:''}){ 
    return new FormGroup({
     
      titre : new FormControl (cert.titre,[Validators.required]),
      dateObtentien : new FormControl (cert.date,[Validators.required]),
      link : new FormControl (cert.link,[Validators.required]),
      id : new FormControl (cert.id,[Validators.required]),
     
    })
  }
 
    competence (comp:any={niveau:'',title:'',id:''}){ 
      return new FormGroup({
        id: new FormControl (comp.id,[Validators.required]),
        nom : new FormControl (comp.title,[Validators.required]),
        niveau : new FormControl (comp.niveau,[Validators.required]),
      })
    }
    addField(field:any,obj:any){
      let control = <FormArray> this.cvForm.controls[field] ;
  
      if (field=== 'secondaire')
           control = <FormArray> this.cvForm.controls['competence'].controls['secondaire'] ;
      else if (field=== 'langue')
      control = <FormArray> this.cvForm.controls['competence'].controls['langue'] ;
      control.push(obj);
    }
  
    removeField(field:any,index :any){
      let control = <FormArray> this.cvForm.controls[field] ;
      if (field=== 'secondaire')
           control = <FormArray> this.cvForm.controls['competence'].controls['secondaire'] ;
      else if (field=== 'langue')
      control = <FormArray> this.cvForm.controls['competence'].controls['langue'] ;
      control.removeAt(index)
    }
  

  onFileChange(event: any,index:any) {
    if (event.target.files && event.target.files.length > 0) {
      const file = event.target.files[0];
    const control = <FormArray> this.cvForm.controls['certification'] ;

    control.at(index).patchValue({
      imageFile: file
    });
     
      const reader = new FileReader();
      reader.onload = (e: any) => {
        control.at(index).patchValue({
          imageSrc: e.target.result
        });
      };
      reader.readAsDataURL(file);

      
    }
  }
  
  

}
