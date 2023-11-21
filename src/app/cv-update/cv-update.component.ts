import { Component } from '@angular/core';
import { CvBuiderService } from '../services/cv-buider.service';
import { CvBuilderApiCallsService } from '../services/cv-builder-api-calls.service';
import { ToastrService } from 'ngx-toastr';
import { CvUpdaterService } from '../services/cv-updater.service';
import { ActivatedRoute } from '@angular/router';
import { FormArray } from '@angular/forms';

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
  userID :any 
  usercv:any ={
    "experience": [
      {
        "societe": "Company 1",
        "post": "Developer",
        "localisation": "Paris",
        "debut": "2022-01-01",
        "fin": "2022-12-31"
      },
      {
        "societe": "Company 2",
        "post": "Developer",
        "localisation": "Paris",
        "debut": "2022-01-01",
        "fin": "2022-12-31"
      }
    ],
    "formation": [
      {
        "institut": "University of Paris",
        "diploma": "Computer Science",
        "dateObtentien": "2020-03-15",

      }
    ],
    "certification": [
      {
      
        "titre": "MCSA",
        "dateObtentien": "2020-03-15",
        "image": "image1.png",
        "imageSrc": "",
        "imageFile": null
      }
    ],
    "competence": {
      "principale": {
        "nom": "JavaScript",
        "niveau": "debutant"
      },
      "secondaire": [
        {
          
          "nom": "Secondary Skill 1",
          "niveau": "avance"
        },
        {
          
          "nom": "Secondary Skill 2",
          "niveau": "intermediaire"
        },
        {
          
          "nom": "Secondary Skill 3",
          "niveau": "intermediaire"
        },
        {
          
          "nom": "Secondary Skill 4",
          "niveau": "intermediaire"
        },
        {
          
          "nom": "Secondary Skill 5",
          "niveau": "intermediaire"
        }
      ],
      "langue": [
        {
          
          "nom": "langue 1",
          "niveau": "NA"
        },
        {
          
          "nom": "langue 2",
          "niveau": "A1"
        },
        {
          
          "nom": "langue 3",
          "niveau": "A1"
        },
        {
          
          "nom": "langue 4",
          "niveau": "A1"
        },
        {
          
          "nom": "langue 5",
          "niveau": "A1"
        }
      ]
    }
  }
  
 constructor(public cv:CvUpdaterService ,private cvApi :CvBuilderApiCallsService ,private toastr: ToastrService, private route: ActivatedRoute){
  
  this.route.paramMap.subscribe(params => { this.userID= params.get('id') ;console.log(this.userID)}) ;
  this.cv.createCvForm(this.usercv)
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
    const experiences =this.cv.cvForm.get('experience')
    const certifications =this.cv.cvForm.get('certification')
    const formations =this.cv.cvForm.get('formation')
    const competences =this.cv.cvForm.get('competence')

      try {
        this.cvApi.editExperiences(this.userID,experiences)
        this.cvApi.editFormations(this.userID,formations)
        this.cvApi.editCertifications(this.userID,certifications)
        this.cvApi.editCompetences(this.userID,competences)

        this.toastr.success(' mis à jour avec succés', 'CV');
      } catch (error) {
        this.toastr.error('erreur prodiute lors de la modification', ' CV');
      }
     
     console.log(this.cv.cvForm)
    
  }

}
