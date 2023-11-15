import {  Component } from '@angular/core';
import { CvBuiderService } from '../services/cv-buider.service';
import { CvBuilderApiCallsService } from '../services/cv-builder-api-calls.service';
import { ToastrService } from 'ngx-toastr';
@Component({
  selector: 'app-cv-builder',
  templateUrl: './cv-builder.component.html',
  styleUrls: ['./cv-builder.component.css']
})
export class CvBuilderComponent {


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
  
 constructor(public cv:CvBuiderService ,private cvApi :CvBuilderApiCallsService ,private toastr: ToastrService){
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

  buildCv(){
    const experiences =this.cv.cvForm.get('experience')
    const certifications =this.cv.cvForm.get('certification')
    const formations =this.cv.cvForm.get('formation')
    const competences =this.cv.cvForm.get('competence')
   
      
      try {
        this.cvApi.addExperiences(experiences)
        this.cvApi.addFormations(formations)
        this.cvApi.addCertifications(certifications)
        this.cvApi.addCompetences(competences)

        this.toastr.success(' crée avec succés', 'CV');
      } catch (error) {
        this.toastr.error('erreur prodiute lors de la création', ' CV');
      }
     
     
    console.log(this.cv.cvForm);
    
  }

}
