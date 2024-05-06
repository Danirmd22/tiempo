import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { getAuth } from 'firebase/auth';
import { signInWithEmailAndPassword } from "firebase/auth";
@Component({
  selector: 'app-header',
  templateUrl: './login.component.html',

})
export class LoginComponent {

constructor () {
  const auth = getAuth();
}

login(email: string, password: string) {
  console.log("ESTO ES UNA PRUEBAAAAAAAAAAAAAAAAAAAAA");
  const auth = getAuth();
  signInWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      // Inicio de sesión exitoso, puedes acceder a los datos del usuario con userCredential.user
      console.log("Inicio de sesión exitoso");
    })
    .catch((error) => {
      // Error en el inicio de sesión, puedes manejar el error aquí
      console.log("Error en el inicio de sesión");
    });
}
}
