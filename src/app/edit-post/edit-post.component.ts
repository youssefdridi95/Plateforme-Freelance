import { Component ,OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-edit-post',
  templateUrl: './edit-post.component.html',
  styleUrls: ['./edit-post.component.css']
})
export class EditPostComponent implements OnInit {

  postForm: FormGroup 

  post = {
    'cometence' : 'java' ,
    'description' : 'tatatatatatatatatatatatatatat' ,
     'tags' : 'Sunt elit aut proi///Commodo itaque commo///Sint a…exc///Tempora dolor rem qu///Est modi esse verita'
  }

  constructor(private formBuilder: FormBuilder) {
    this.postForm = this.formBuilder.group({
      competence: ['', Validators.required],
      description: [''],
      tags: this.formBuilder.array([
        this.formBuilder.group({
          name: ['', Validators.required]
        })
      ])
    });
  }
  ngOnInit(): void {
    this.patchForm();
  }

  patchForm() {
    this.postForm.patchValue({
      competence: this.post['cometence'],
      description: this.post['description'],
    });

    // Assuming that the number of tags in the post object matches the initial structure
    const tagsArray = this.postForm.get('tags') as FormArray;
    tagsArray.clear(); // Clear existing tags

    this.post['tags'].split('///').forEach(tag => {
      tagsArray.push(this.formBuilder.group({
        name: tag
      }));
    });
  }

getControls() {
  return (this.postForm.get('tags') as FormArray).controls;
}

  addField() {
        let control = <FormArray> this.postForm.controls['tags'] ;

        control.push(new FormGroup({
          name: new FormControl("", [Validators.required])
        }));
  }

  removeField(index: any) {
        let control = <FormArray> this.postForm.controls['tags'] ;

    control.removeAt(index);
  }

    removefile(index: any) {
        let control = <FormArray> this.postForm.controls['file'] ;

    control.removeAt(index);
  }

  onSubmit() {
   
  
    const formData = new FormData();
  
    formData.append('competence', this.postForm.value.competence);
    formData.append('description', this.postForm.value.description);
  
    // Assuming tags is an array of tag objects

    
    const tags = this.postForm.value.tags.map((tag: { name: string }) => tag.name).join('///');
    
     formData.append('tags', tags);
    
   
    const formDataObject: any = {};
    formData.forEach((value, key) => {
      if (!formDataObject[key]) {
        formDataObject[key] = value;
      } else {
        if (!Array.isArray(formDataObject[key])) {
          formDataObject[key] = [formDataObject[key]];
        }
        formDataObject[key].push(value);
      }
    });
  
    // Log the converted object
    console.log(formDataObject);
  }
}
