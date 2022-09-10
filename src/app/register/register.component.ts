import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
public registerForm! : FormGroup;
isSubmitted = false;
  constructor(private formbuilder: FormBuilder) { }

  ngOnInit(): void {

    // REGISTRATION FORM VALIDATION
    this.registerForm = this.formbuilder.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      email: ['', [
        Validators.required, Validators.pattern("^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$")]],
      phoneNo: ['', Validators.required],
      address: ['', Validators.required],
      state: ['', Validators.required],
      country: ['', Validators.required],
      password: ['', Validators.required],
      confirmPassword: ['', Validators.required]
    });
 // END OF REGISTRATION FORM VALIDATION
  }
  
  submit(){
    this.isSubmitted = true;
      console.log(this.registerForm.value);
  }

}
