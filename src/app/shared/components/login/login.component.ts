import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { getAuth } from 'firebase/auth';
import { signInWithEmailAndPassword } from "firebase/auth";
import { MatSnackBar } from '@angular/material/snack-bar';
import { EventEmitter, Output } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import {  GoogleAuthProvider, signInWithPopup } from "firebase/auth";
@Component({
  selector: 'app-header',
  templateUrl: './login.component.html',

})
export class LoginComponent {
  @Output() loginSuccess = new EventEmitter<void>();
  loginForm: FormGroup;


constructor (private snackBar: MatSnackBar) {
  const auth = getAuth();
    this.loginForm = new FormGroup({
      username: new FormControl(''),
      password: new FormControl(''),
    });
}


login() {
  const auth = getAuth();
  signInWithEmailAndPassword(auth, this.loginForm.value.username, this.loginForm.value.password)
    .then((userCredential) => {


      localStorage.setItem('user', JSON.stringify(userCredential.user));
      localStorage.setItem('isLoggedIn', 'true');

      this.loginSuccess.emit();
      location.reload();
    })
    .catch((error) => {
      let errorMessage = '';
      switch (error.code) {
        case 'auth/user-not-found':
          errorMessage = 'Usuario no encontrado';
          this.snackBar.open(errorMessage, 'Cerrar', {
            duration: 2000,
          });
          break;
        case 'auth/wrong-password':
          errorMessage = 'Contraseña incorrecta';
          this.snackBar.open(errorMessage, 'Cerrar', {
            duration: 2000,
          });
          break;
          case 'auth/invalid-credential':
            errorMessage = 'Credenciales incorrectas';
            this.snackBar.open(errorMessage, 'Cerrar', {
              duration: 2000,
            });
            break;
        // Añade más casos según necesites

      }


    });
}

loginWithGoogle() {
  const provider = new GoogleAuthProvider();
  const auth = getAuth();
  signInWithPopup(auth, provider)
    .then((result) => {

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
