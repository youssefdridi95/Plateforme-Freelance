import {  Component } from '@angular/core';
import { CvBuiderService } from '../services/cv-buider.service';
import { CvBuilderApiCallsService } from '../services/cv-builder-api-calls.service';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { FormArray } from '@angular/forms';
import { skills } from 'src/skills';
@Component({
  selector: 'app-cv-builder',
  templateUrl: './cv-builder.component.html',
  styleUrls: ['./cv-builder.component.css']
})
export class CvBuilderComponent {



  devSkills = skills
  
 constructor(public cv:CvBuiderService ,private cvApi :CvBuilderApiCallsService ,private toastr: ToastrService ,private route:Router ){
 }
       
// In your component class
isSectionOpen: { [key: string]: boolean } = {
  'experience': false,
  'formation': false,
  'certification': false,
  'competence': true,
  'langue': false
};

toggleSection(section: string): void {
  let control = <FormArray> this.cv.cvForm.controls[section] ;

  if (section=== 'secondaire')
       control = <FormArray> this.cv.cvForm.controls['competence'].controls['secondaire'] ;
  else if (section=== 'langue')
  control = <FormArray> this.cv.cvForm.controls['competence'].controls['langue'] ;
if(control.length == 0)
  switch (section) {
   case "experience" : this.cv.addField('experience',this.cv.experience()) ;break ;
   case "formation" : this.cv.addField('formation',this.cv.formation()) ;break ;
   case "certification" : this.cv.addField('certification',this.cv.certification()) ;break ;
   case "langue" : this.cv.addField('langue',this.cv.competence()) ;break ;
   case "competence" : this.cv.addField('secondaire',this.cv.competence()) ;break ;
   default : break ;
}
  for (const key in this.isSectionOpen) {
    if (key !== section) {
      this.isSectionOpen[key] = false;
    }
  }
  this.isSectionOpen[section] = !this.isSectionOpen[section];

}

  buildCv(){
    interface CvJSON {
    
      experiences: {
        company: any;
        position: any;
        localisation: any;
        employementType: any;
        debut: any;
        fin: any;
      }[];
      formations: {
        school: any;
        degree: any;
        date: any;
      }[];
      certifications: {
        titre: any;
        date: any;
        link: any;
      }[];
      competences: {
          type :any
          title: any;
          niveau: any;
        }[];
      };
    
    
    let cvJSON: CvJSON = {
   
      "experiences" :[],
      "certifications" :[],
      "formations" :[],
      "competences" :[],  
    };
    
    const experiences = this.cv.cvForm.value.experience ;
    const certifications = this.cv.cvForm.value.certification;
    const formations = this.cv.cvForm.value.formation;
    const competences = this.cv.cvForm.value.competence;
    
    experiences.forEach((exp : any) => {
      let expJSON = {
        "company": exp.societe,
        "debut": exp.debut,
        "fin": exp.fin,
        "localisation": exp.localisation,
        "employementType": exp.employementType,

        "position": exp.post
      };
      
      cvJSON.experiences.push(expJSON);
    });

    certifications.forEach((cert : any) => {
      let certJSON =  {
        "titre": cert.titre,
        "date": cert.dateObtentien,
        "link": cert.image
      }
      
      cvJSON.certifications.push(certJSON);
    });

    formations.forEach((form : any) => {
      let formJSON =  {
        "school": form.institut,
        "degree": form.diploma,
        "date": form.dateObtentien
      }
      
      cvJSON.formations.push(formJSON);
    });

    let compPrincJSON =  {
      "type": "COMPETENCE_TECH" ,
      "title": competences.principale.nom,
      "niveau": competences.principale.niveau
    }
    cvJSON.competences.push(compPrincJSON);

    competences.secondaire.forEach((comp : any) => {
      let compJSON =  {
        "type": "COMPETENCE_TECH",
        "title": comp.nom,
        "niveau": comp.niveau
      }
      
      cvJSON.competences.push(compJSON);
    });

    competences.langue.forEach((comp : any) => {
      let compJSON =  {
        "type": "COMPETENCE_LANG",
        "title": comp.nom,
        "niveau": comp.niveau
      }
      
      cvJSON.competences.push(compJSON);
    });
    
    this.cvApi.updateMain(competences.principale.nom.toUpperCase(),JSON.parse(sessionStorage.getItem('profil')!).id).subscribe(
      res=>{
      
  console.log(res);
        
    
  this.toastr.success('a été modifiée avec succés ','Compétence Principale')

      },
      err=>{
    console.log(err);
    this.toastr.error(err.error.message,'erreur')
      }
    )
    

    this.cvApi.build(cvJSON,JSON.parse(sessionStorage.getItem('profil')!).id).subscribe(
      res=>{
      
  console.log(res);
        
     this.route.navigate(['/user/compte',JSON.parse(sessionStorage.getItem('user')!).id])
    
  this.toastr.success('a été crée avec succés ','CV')

      },
      err=>{
    console.log(err);
    this.toastr.error(err.error.message,'erreur')
      }
    )
  
  }


  }


