import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage implements OnInit {

  constructor(private angFireAuth: AngularFireAuth,private router: Router) { }

  ngOnInit() {
  }
    //fonction register a l aide de module Angular/Fire 'createUserWithEmailAndPassword()'
  register(f){
    this.angFireAuth.createUserWithEmailAndPassword(f['email'],f['password']).then(
      ()=>{this.router.navigateByUrl('home');},
      (error)=>{console.log(error);}
    )
  }
  //fonction de navigation vers le route login
  login(){
    this.router.navigateByUrl('/login')
  }

}
