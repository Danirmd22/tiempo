import { Component } from '@angular/core';
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import { FormGroup, FormControl } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-registro',
  templateUrl: './registro.component.html',
  styleUrl: './registro.component.css'
})
export class RegistroComponent {
  registerForm: FormGroup;

  constructor(private snackBar: MatSnackBar) {
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
        this.snackBar.open('Usuario registrado correctamente', 'Cerrar', {
          duration: 2000,
        });
      })
      .catch((error) => {
        console.error(error);
        this.snackBar.open('Error al registrar el usuario', 'Cerrar', {
          duration: 2000,
        });
      });
  }
}
