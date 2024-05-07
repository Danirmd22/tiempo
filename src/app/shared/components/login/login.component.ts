import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { getAuth } from 'firebase/auth';
import { signInWithEmailAndPassword } from "firebase/auth";
import { MatSnackBar } from '@angular/material/snack-bar';
@Component({
  selector: 'app-header',
  templateUrl: './login.component.html',

})
export class LoginComponent {

constructor (private snackBar: MatSnackBar) {
  const auth = getAuth();
}

login(email: string, password: string) {
  const auth = getAuth();
  signInWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      // Inicio de sesión exitoso, puedes acceder a los datos del usuario con userCredential.user
      console.log("Inicio de sesión exitoso");
      this.snackBar.open('Inicio de sesión exitoso', 'Cerrar', {
        duration: 2000,
      });
    })
    .catch((error) => {
      // Error en el inicio de sesión, puedes manejar el error aquí
      console.log("Error en el inicio de sesión");
      this.snackBar.open('Correo eléctronico o Contraseña incorrecta', 'Cerrar', {
        duration: 4000,
      });
    });
}
}
