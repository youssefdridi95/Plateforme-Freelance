

import {  Injectable } from '@angular/core';
import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';

@Injectable({
  providedIn: 'root'
})
export class CvUpdaterService {

  constructor(){
  }
  cvForm :any  = new FormGroup({
    experience : new FormArray([
    ]) ,
    formation : new FormArray([
     
    ]),
    certification : new FormArray([
     
    ]),
    competence : new FormArray([])
    
  })
  

  createCvForm(cv:any){
    const experiences = cv.experience;
    const formations = cv.formation;
    const competences = cv.competence;
    const certifications = cv.certification;

    experiences.map((item:any)=>{
        this.addField('experience',this.experience(item))
    })

    
    formations.map((item:any)=>{
      this.addField('formation',this.formation(item))
  })  
  
  certifications.map((item:any)=>{
    this.addField('certification',this.certification(item))
})

competences.map((item:any)=>{
  this.addField('competence',this.competence(item))
})


    const  cvForm=new FormGroup({
      experience : new FormArray([
      ]) ,
      formation : new FormArray([
       
      ]),
      certification : new FormArray([
       
      ]),
      competence : new FormArray([])
      
    })
    
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
    const control = <FormArray> this.cvForm.controls[field] ;
    control.push(obj);
  }

  removeField(field:any,index :any){
    const control = <FormArray> this.cvForm.controls[field] ;
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
