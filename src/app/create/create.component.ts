import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';


@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.scss']
})
export class CreateComponent {
  formGroup: FormGroup;

  constructor(fb: FormBuilder) {
    this.formGroup = fb.group({
      'itemName': ['', Validators.required],
      'price': [null, Validators.required]
    })
  }

  onSave(e) {
    if (this.formGroup.dirty && this.formGroup.valid) {
      console.log(this.formGroup.value)
    }
  }
}
