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
      // Guardar los datos del usuario en el almacenamiento local
      localStorage.setItem('user', JSON.stringify(userCredential.user));
      localStorage.setItem('isLoggedIn', 'true');
      // Emitir evento de éxito de inicio de sesión
      this.loginSuccess.emit();
      location.reload();
    })
    .catch((error) => {
      console.error(error);
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
