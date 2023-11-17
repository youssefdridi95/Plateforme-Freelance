import {  Injectable } from '@angular/core';
import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';

@Injectable({
  providedIn: 'root'
})
export class CvBuiderService {

  constructor(){
    this.createCvForm()
  }
  cvForm :any 

  createCvForm(){
    this.cvForm=new FormGroup({
      experience : new FormArray([
       
      ]) ,
      formation : new FormArray([
       
      ]),
      certification : new FormArray([
       
      ]),
      competence : new FormGroup({
          principale : new FormGroup({
            nom : new FormControl ("",[Validators.required]),
            niveau : new FormControl ("",[Validators.required]),
              }),
          secondaire : new FormArray([
          
      
             ]),

      })
      
    })
    
  }

  experience (){ 
    return new FormGroup({
    societe : new FormControl ("",[Validators.required]),
    post : new FormControl ("",[Validators.required]),
    localisation : new FormControl ("",[Validators.required]),
    desc : new FormControl ("",[Validators.minLength(100),Validators.required]),
    debut : new FormControl ("",[Validators.required]),
    fin : new FormControl ("")
  })
}

  formation(){ 
    return new FormGroup({
    institut : new FormControl ("",[Validators.required]),
    niveau : new FormControl ("",[Validators.required]),
    specialite : new FormControl ("",[Validators.required]),
    debut : new FormControl ("",[Validators.required]),
    fin : new FormControl (""),
  })}

  certification(){ 
    return new FormGroup({
      organisation : new FormControl ("",[Validators.required]),
      niveau : new FormControl ("",[Validators.required]),
      titre : new FormControl ("",[Validators.required]),
      dateObtentien : new FormControl ("",[Validators.required]),
      desc : new FormControl ("",[Validators.required]),
      image : new FormControl (null,[Validators.required]),
      imageSrc : new FormControl (null,[Validators.required]),
      imageFile : new FormControl (null,[Validators.required]),
      
    })
  }
 
    competence (type:string){ 

      return new FormGroup({
        type : new FormControl (type,[Validators.required]),
        nom : new FormControl ("",[Validators.required]),
        niveau : new FormControl ("",[Validators.required]),
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


  removeAll(field:any){
    let control = <FormArray> this.cvForm.controls[field] ;
    if (field=== 'competence')
    control = <FormArray> this.cvForm.controls[field].controls['secondaire'] ;

    control.clear()
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