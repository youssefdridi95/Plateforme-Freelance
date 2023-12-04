import { Component } from '@angular/core';
import { CvBuilderApiCallsService } from '../services/cv-builder-api-calls.service';
import { ToastrService } from 'ngx-toastr';
import { CvUpdaterService } from '../services/cv-updater.service';
import { FormArray } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-cv-update',
  templateUrl: './cv-update.component.html',
  styleUrls: ['./cv-update.component.css']
})



export class CvUpdateComponent {


   devSkills = [
    'Python',
    'JavaScript',
    'React',
    'Node.js',
    'Java',
    'Spring Framework',
    'Ruby',
    'Ruby on Rails',
    'HTML',
    'CSS',
    'SQL',
    'MongoDB',
    'Docker',
    'Kubernetes',
    'AWS',
    'Azure',
    'CI/CD',
    'Git',
    'Agile Methodologies',
    'Data Structures',
    'Algorithms',
    'Front-End Development',
    'Back-End Development',
    'Mobile App Development',
    'Machine Learning',
    'DevOps',
    'Cybersecurity',
    'UI/UX Design',
    'Test-Driven Development',
    'Version Control',
    'Continuous Integration',
    'Scrum',
    'C++',
    'C#',
    'PHP',
    'Swift',
    'Objective-C',
    'Android Development',
    'iOS Development',
    'Angular',
    'Vue.js',
    'TypeScript',
    'Rust',
    'Go',
    'ASP.NET',
    'Unity',
    'TensorFlow',
    'PyTorch',
    'Blockchain',
    'GraphQL',
    'R',
    'Shell Scripting',
    'React Native',
    'Redux',
    'Jenkins',
    'Vue.js',
    'Vue Router',
    'Webpack',
    'GraphQL',
    'PostgreSQL',
    'NoSQL Databases',
    'Django',
    'Flask',
    'PHP Laravel',
    'WordPress Development',
    'Magento',
    'Joomla',
    'Elixir',
    'Scala',
    'Hadoop',
    'Spark',
    'Hive',
    'Elasticsearch',
    'Redis',
    'Express.js',
    'Meteor.js',
    'Knockout.js',
    'Sass',
    'LESS',
    'WebSockets',
    'Socket.io',
    'GraphQL',
    'Apollo Server',
    'Redux Saga',
    'MobX',
    'Nginx',
    'Apache',
    'RESTful APIs',
    'Microservices Architecture',
    'D3.js',
    'Three.js',
    'MapReduce',
    'Kafka',
    'AWS Lambda',
    'Google Cloud Functions',
    'Firebase',
    'OAuth',
    'JSON Web Tokens',
    'OAuth2',
    'WebRTC',
    'Augmented Reality (AR)',
    'Virtual Reality (VR)',
    'Internet of Things (IoT)',
  ];
  usercv:any 
 constructor(public cv:CvUpdaterService ,private cvApi :CvBuilderApiCallsService ,private toastr: ToastrService, private route: Router){
  this.cvApi.get(JSON.parse(sessionStorage.getItem('profil')!).id).subscribe(
    (res)=>{
   this.usercv=res
      console.log('eeeeeeeeeeeeeeeeeeeeee',this.usercv);
      
  this.cv.createCvForm( res)
  console.log('form',this.cv.cvForm);

    },
    (err)=>{
      console.log(err);
      
    }
  )
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

  updateCv(){

    interface CvJSON {
    id : string
      experiences: {
        company: any;
        id: any;
        position: any;
        localisation: any;
        employementType: any;
        debut: any;
        fin: any;
      }[];
      formations: {
        school: any;
        id: any;
        degree: any;
        date: any;
      }[];
      certifications: {
        titre: any;
        id: any;
        date: any;
        link: any;
      }[];
      competences: {
          type :any
          title: any;
        id: any;
        niveau: any;
        }[];
      };
    
    
      const experiences = this.cv.cvForm.value.experience ;
      const certifications = this.cv.cvForm.value.certification;
      const formations = this.cv.cvForm.value.formation;
      const competences = this.cv.cvForm.value.competence;
    let cvJSON: CvJSON = {
      "id" : this.usercv.id ,
      "experiences" :[],
      "certifications" :[],
      "formations" :[],
      "competences" :[],  
    };

       
    experiences.forEach((exp : any) => {
      
      let expJSON = {
        "company": exp.societe,
        "id": exp.id,
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
        "id": cert.id,
        "date": cert.dateObtentien,
        "link": cert.link
      }
      
      cvJSON.certifications.push(certJSON);
    });

    formations.forEach((form : any) => {
      let formJSON =  {
        "school": form.institut,
        "id": form.id,
        "degree": form.diploma,
        "date": form.dateObtentien
      }
      
      cvJSON.formations.push(formJSON);
    });

    let compPrincJSON =  {
      "type": "COMPETENCE_TECH" ,
        "id": competences.principale.id,
        "title": competences.principale.nom,
      "niveau": competences.principale.niveau
    }
    cvJSON.competences.push(compPrincJSON);
    
    competences.secondaire.forEach((comp : any) => {
      let compJSON =  {
        "type": "COMPETENCE_TECH",
        "title": comp.nom,
        "id": comp.id,
        "niveau": comp.niveau
      }
      
      cvJSON.competences.push(compJSON);
    });

    competences.langue.forEach((comp : any) => {
      let compJSON =  {
        "type": "COMPETENCE_LANG",
        "title": comp.nom,
        "id": comp.id,

        "niveau": comp.niveau
      }
      
      cvJSON.competences.push(compJSON);
    });
    
    this.cvApi.updateMain(competences.principale.nom,JSON.parse(sessionStorage.getItem('profil')!).id).subscribe(
      res=>{
      
  console.log(res);
        
    
  this.toastr.success('a été modifiée avec succés ','Compétence Principale')

      },
      err=>{
    console.log(err);
   // this.toastr.error(err.error.message,'erreur')
      }
    )
    this.cvApi.update(cvJSON).subscribe(
      res=>{
      
  console.log(res);
        
  this.route.navigate(['/user/compte',JSON.parse(sessionStorage.getItem('user')!).id])
  this.toastr.success('a été modifié avec succés ','CV')

      },
      err=>{
    console.log(err);
    this.toastr.error(err.error.message,'erreur')
      }
    )
    
  }

}
