

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
    const experiences = cv.experience || [];
    const formations = cv.formation || [];
    const competences = cv.competence || { principale: {}, secondaire: [] };
    const certifications = cv.certification || [];
  

  
    const competencesSecondArray = competences.secondaire || [];
    const languesArray = competences.langue || [];

    const competenceSecondControls = competencesSecondArray.map((item: any) => this.competence(item));
    const langueControls = languesArray.map((item: any) => this.competence(item));

    const experienceControls = experiences.map((item: any) => this.experience(item));
    const formationControls = formations.map((item: any) => this.formation(item));
    const certificationControls = certifications.map((item: any) => this.certification(item));
  
    this.cvForm = new FormGroup({
      experience: new FormArray(experienceControls),
      formation: new FormArray(formationControls),
      certification: new FormArray(certificationControls),
      competence: new FormGroup({
        principale: new FormGroup({
          nom: new FormControl(competences.principale.nom || "", [Validators.required]),
          niveau: new FormControl(competences.principale.niveau || "", [Validators.required]),
        }),
        secondaire: new FormArray(competenceSecondControls),
       langue: new FormArray(langueControls),
      }),
    
    });
  
    
  }

  experience (exp:any={societe :'',post:'',localisation:'',debut :'',fin:''}){ 
    return new FormGroup({
    societe : new FormControl (exp.societe,[Validators.required]),
    post : new FormControl (exp.post,[Validators.required]),
    localisation : new FormControl (exp.localisation,[Validators.required]),
    debut : new FormControl (exp.debut,[Validators.required]),
    fin : new FormControl (exp.fin)
  })
}

  formation(form:any={institut :'',diploma:'',dateObtentien :''}){ 
    return new FormGroup({
    institut : new FormControl (form.institut,[Validators.required]),
    diploma : new FormControl (form.diploma,[Validators.required]),
    dateObtentien : new FormControl (form.dateObtentien,[Validators.required]),
    
  })}

  certification(cert:any={titre:'',dateObtentien :'',imageSrc:''}){ 
    return new FormGroup({
     
      titre : new FormControl (cert.titre,[Validators.required]),
      dateObtentien : new FormControl (cert.dateObtentien,[Validators.required]),
      image : new FormControl (null,[Validators.required]),
      imageSrc : new FormControl (cert.imageSrc,[Validators.required]),
      imageFile : new FormControl (null,[Validators.required]),
      
    })
  }
 
    competence (comp:any={niveau:'',nom:''}){ 
      return new FormGroup({
        nom : new FormControl (comp.nom,[Validators.required]),
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
