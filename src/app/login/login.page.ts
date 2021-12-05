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

  async logIn(f){
    this.aFireAuth.signInWithEmailAndPassword(f['email'],f['pwd']).then(
      (res)=>{
        
        localStorage.setItem('mytoken',res.user['refreshToken']);
        let userId=res.user['uid'];
        this.router.navigateByUrl('home/'+userId);
      },
      (error)=>{
        console.error();
      }
    )
  }

  Register(){
    this.router.navigateByUrl('/register');
  }

  ResetPwd(){
    this.router.navigateByUrl('/resetPwd');
  }
}
