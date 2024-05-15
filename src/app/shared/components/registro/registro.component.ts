import { Component } from '@angular/core';
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import { FormGroup, FormControl } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import {  GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { EventEmitter, Output } from '@angular/core';
@Component({
  selector: 'app-registro',
  templateUrl: './registro.component.html',
  styleUrl: './registro.component.css'
})
export class RegistroComponent {
  registerForm: FormGroup;
  @Output() loginSuccess = new EventEmitter<void>();

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
        this.registerForm.reset();
      })
      .catch((error) => {
        

      });
  }

  loginWithGoogle() {
    const provider = new GoogleAuthProvider();
    const auth = getAuth();
    signInWithPopup(auth, provider)
      .then((result) => {
        // El usuario ha iniciado sesión correctamente.
        localStorage.setItem('user', JSON.stringify(result.user));
        localStorage.setItem('isLoggedIn', 'true');
        this.loginSuccess.emit();
        location.reload();
      })
      .catch((error) => {
        console.error(error);
      });
  }
}
