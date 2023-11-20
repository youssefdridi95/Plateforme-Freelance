import { Component } from '@angular/core';
import { CvBuiderService } from '../services/cv-buider.service';
import { CvBuilderApiCallsService } from '../services/cv-builder-api-calls.service';
import { ToastrService } from 'ngx-toastr';
import { CvUpdaterService } from '../services/cv-updater.service';
import { ActivatedRoute } from '@angular/router';

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
        "desc": "Lorem ipsum...",
        "debut": "2022-01-01",
        "fin": "2022-12-31"
      },
      {
        "societe": "Company 2",
        "post": "Developer",
        "localisation": "Paris",
        "desc": "Lorem ipsum...",
        "debut": "2022-01-01",
        "fin": "2022-12-31"
      }
    ],
    "formation": [
      {
        "institut": "University of Paris",
        "niveau": "Bachelor",
        "specialite": "Computer Science",
        "debut": "2018-09-01",
        "fin": "2022-06-30"
      }
    ],
    "certification": [
      {
        "organisation": "Microsoft",
        "niveau": "Expert",
        "titre": "MCSA",
        "dateObtentien": "2020-03-15",
        "desc": "Lorem ipsum...",
        "image": "image1.png",
        "imageSrc": "data:image/png;base64,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",
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
          "niveau": "Na"
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
  'competence': true
};

toggleSection(section: string): void {
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
        this.toastr.error('erreur prodiute lors de la création', ' CV');
      }
     
     console.log(this.cv.cvForm)
    
  }

}
