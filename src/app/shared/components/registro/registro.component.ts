import { Component } from '@angular/core';
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import { FormGroup, FormControl } from '@angular/forms';
@Component({
  selector: 'app-registro',
  templateUrl: './registro.component.html',
  styleUrl: './registro.component.css'
})
export class RegistroComponent {
  registerForm: FormGroup;

  constructor() {
    this.registerForm = new FormGroup({
      email: new FormControl(''),
      password: new FormControl(''),
    });
  }

  register() {
    const auth = getAuth();
    createUserWithEmailAndPassword(auth, this.registerForm.value.email, this.registerForm.value.password)
      .then((userCredential) => {
        // El usuario se ha registrado correctamente.
      })
      .catch((error) => {
        console.error(error);
      });
  }
}
