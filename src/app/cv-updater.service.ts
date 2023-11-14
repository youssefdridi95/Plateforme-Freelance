

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
    }),
  });


  createCvForm(cv: any) {
    const experiences = cv.experience || [];
    const formations = cv.formation || [];
    const competences = cv.competence || { principale: {}, secondaire: [] };
    const certifications = cv.certification || [];
  

  
    const competencesArray = competences.secondaire || [];
    const competenceControls = competencesArray.map((item: any) => this.competence(item));
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
        secondaire: new FormArray(competenceControls),
      }),
    });
  
    
  }

  experience (exp:any={societe :'',post:'',localisation:'',dec:'',debut :'',fin:''}){ 
    return new FormGroup({
    societe : new FormControl (exp.societe,[Validators.required]),
    post : new FormControl (exp.post,[Validators.required]),
    localisation : new FormControl (exp.localisation,[Validators.required]),
    desc : new FormControl (exp.desc,[Validators.minLength(100),Validators.required]),
    debut : new FormControl (exp.debut,[Validators.required]),
    fin : new FormControl (exp.fin)
  })
}

  formation(form:any={institut :'',niveau:'',specialite:'',debut :'',fin:''}){ 
    return new FormGroup({
    institut : new FormControl (form.institut,[Validators.required]),
    niveau : new FormControl (form.niveau,[Validators.required]),
    specialite : new FormControl (form.specialite,[Validators.required]),
    debut : new FormControl (form.debut,[Validators.required]),
    fin : new FormControl (form.fin),
  })}

  certification(cert:any={organisation :'',niveau:'',titre:'',dateObtentien :'',imageSrc:''}){ 
    return new FormGroup({
      organisation : new FormControl (cert.organisation,[Validators.required]),
      niveau : new FormControl (cert.niveau,[Validators.required]),
      titre : new FormControl (cert.titre,[Validators.required]),
      dateObtentien : new FormControl (cert.dateObtentien,[Validators.required]),
      desc : new FormControl (cert.desc,[Validators.required]),
      image : new FormControl (null,[Validators.required]),
      imageSrc : new FormControl (cert.imageSrc,[Validators.required]),
      imageFile : new FormControl (null,[Validators.required]),
      
    })
  }
 
    competence (comp:any={type :'secondaire',niveau:'',nom:''}){ 
      return new FormGroup({
        type : new FormControl (comp.type,[Validators.required]),
        nom : new FormControl (comp.nom,[Validators.required]),
        niveau : new FormControl (comp.niveau,[Validators.required]),
      })
    }
    addField(field:any,obj:any){
      let control = <FormArray> this.cvForm.controls[field] ;
  
      if (field=== 'competence')
           control = <FormArray> this.cvForm.controls[field].controls['secondaire'] ;
  
      control.push(obj);
    }
  
    removeField(field:any,index :any){
      let control = <FormArray> this.cvForm.controls[field] ;
      if (field=== 'competence')
      control = <FormArray> this.cvForm.controls[field].controls['secondaire'] ;
  
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
