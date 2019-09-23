import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { VosDemoServiceService } from './vos-demo-service.service';

@Component({
  selector: 'app-vos-demo',
  templateUrl: './vos-demo.component.html',
  styleUrls: ['./vos-demo.component.sass']
})
export class VosDemoComponent implements OnInit {

  createPhoneForm: FormGroup
  constructor(private fb: FormBuilder, private vosService: VosDemoServiceService) { 
    this.createPhoneForm = this.fb.group({
      autoCreateAccount: [true, Validators.required],
      e164: ['',[Validators.required,Validators.minLength(1),Validators.maxLength(64)]],
      password: ['',[Validators.minLength(1),Validators.maxLength(32)]],
      displayNumber:['',[Validators.minLength(1),Validators.maxLength(64)]],
      account: ['',[Validators.minLength(1),Validators.maxLength(64)]],
    });
  }

  ngOnInit() {
  }

  onCreatePhone(){
    console.log(this.createPhoneForm.value);
    this.vosService.GetCustomer();
  }
}
