import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { CustomValidators } from 'src/app/core/helper/custom-validators';

@Component({
  selector: 'app-add-element',
  templateUrl: './add-element.component.html',
  styleUrls: ['./add-element.component.less']
})
export class AddElementComponent implements OnInit {


  mountainForm: FormGroup = new FormGroup({});
  
  constructor(private formBuilder: FormBuilder,
    public dialogRef: MatDialogRef<AddElementComponent>) { }

  ngOnInit(): void {
    this.initForm();
  }

  initForm(){
    this.mountainForm = this.formBuilder.group({
      masiv: ["", Validators.required],
      plecare: ["",
        {
        validators: [Validators.compose([
          CustomValidators.wordLength(5),
          Validators.required
        ])],
        updateOn: 'blur'
        }],
      sosire: ["",
      {
        validators: [Validators.compose([
          Validators.required,
          CustomValidators.wordLength(5)
        ])],
        updateOn: 'blur'
      }],
      lungime: ["",
        {
          validators: [Validators.compose([
            Validators.required,
            Validators.pattern(/[0-9]+/)
          ])],
          updateOn: 'blur'
        }],
        diferentaNivel: ["",
          {
            validators: [Validators.compose([
              Validators.required,
              Validators.pattern(/[0-9]+/)
            ])],
            updateOn: 'blur'
          }],
          data: ["",
            {
              validators: [Validators.compose([
                Validators.required,
                CustomValidators.wordLength(10)
              ])],
              updateOn: 'blur'
            }],    
          
    })
  }

  onNoClick(){
    this.dialogRef.close();
  }

  
}
