import { Component } from '@angular/core';
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import { FormGroup, FormControl } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import {  GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { EventEmitter, Output } from '@angular/core';
import { getFirestore, doc, setDoc } from "firebase/firestore";

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

      // Añade los detalles del usuario a Firestore.
      const db = getFirestore();
      return setDoc(doc(db, "usuarios", userCredential.user.uid), {
        email: userCredential.user.email,
        // Añade aquí cualquier otro detalle que quieras guardar.
      });
    })
    .catch((error) => {
      // Maneja el error aquí.
      let errorMessage = '';
      switch (error.code) {
        case 'auth/email-already-in-use':
          errorMessage = 'El correo electrónico ya está en uso';
          break;
        case 'auth/invalid-email':
          errorMessage = 'El correo electrónico no es válido';
          break;
        case 'auth/operation-not-allowed':
          errorMessage = 'La operación no está permitida';
          break;
        case 'auth/weak-password':
          errorMessage = 'La contraseña es demasiado débil';
          break;
        default:
          errorMessage = 'Error desconocido';
          break;
      }
      this.snackBar.open(errorMessage, 'Cerrar', {
        duration: 2000,
      });
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
      this.snackBar.open('Usuario registrado correctamente', 'Cerrar', {
        duration: 2000,
      });

      // Añade los detalles del usuario a Firestore.
      const db = getFirestore();
      return setDoc(doc(db, "usuarios", result.user.uid), {
        email: result.user.email,
        // Añade aquí cualquier otro detalle que quieras guardar.
      });
    })
    .catch((error) => {
      console.error(error);
    });
}
}
