import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators,FormArray } from '@angular/forms';

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
  
  constructor(){
    this.createCvForm()
  }
  cvForm :any 

  createCvForm(){
    this.cvForm=new FormGroup({
      experience : new FormArray([
        new FormGroup({
          societe : new FormControl ("",[Validators.required]),
          post : new FormControl ("",[Validators.required]),
          localisation : new FormControl ("",[Validators.required]),
          desc : new FormControl ("",[Validators.minLength(100),Validators.required]),
          debut : new FormControl ("",[Validators.required]),
          fin : new FormControl ("")
        })
      ]) ,
      formation : new FormArray([
       
      ]),
      certification : new FormArray([
       
      ]),
      competence : new FormArray([])
      
    })
    
  }

  experience = new FormGroup({
    societe : new FormControl ("",[Validators.required]),
    post : new FormControl ("",[Validators.required]),
    localisation : new FormControl ("",[Validators.required]),
    desc : new FormControl ("",[Validators.minLength(100),Validators.required]),
    debut : new FormControl ("",[Validators.required]),
    fin : new FormControl ("")
  })

  formation=  new FormGroup({
    institut : new FormControl ("",[Validators.required]),
    niveau : new FormControl ("",[Validators.required]),
    specialite : new FormControl ("",[Validators.required]),
    debut : new FormControl ("",[Validators.required]),
    fin : new FormControl (""),
  })

  certification = 
    new FormGroup({
      organisation : new FormControl ("",[Validators.required]),
      niveau : new FormControl ("",[Validators.required]),
      titre : new FormControl ("",[Validators.required]),
      dateObtentien : new FormControl ("",[Validators.required]),
      desc : new FormControl ("",[Validators.required]),
      
    })
 
    competence = new FormGroup({
        type : new FormControl ("",[Validators.required]),
        nom : new FormControl ("",[Validators.required]),
        niveau : new FormControl ("",[Validators.required]),
      })

  addField(field:any,obj:any){
    const control = <FormArray> this.cvForm.controls[field] ;
    control.push(obj);
  }

  removeField(field:any,index :any){
    const control = <FormArray> this.cvForm.controls[field] ;
    control.removeAt(index)
  }
  buildCv(){
    console.log(
      this.cvForm
    );
    
  }

}
