import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  constructor(private aFireAuth :AngularFireAuth,private router:Router) { }

  ngOnInit() {
  }
//fonction login a l aide de module Angular/Fire 'signInWithEmailAndPassword()'
  async logIn(f){
    this.aFireAuth.signInWithEmailAndPassword(f['email'],f['pwd']).then(
      (res)=>{
        localStorage.setItem('mytoken',res.user['refreshToken']);
        //variable id pour specifier l'utilisateur connecté
        let id=res.user['uid'];
        this.router.navigateByUrl('home/'+id);
      },
      (error)=>{
        console.error();
      }
    )
  }
  //fonction de navigation vers le route register
  Register(){
    this.router.navigateByUrl('/register');
  }
  //fonction de navigation vers le route du password reset
  ResetPwd(){
    this.router.navigateByUrl('/reset-password');
  }
}
