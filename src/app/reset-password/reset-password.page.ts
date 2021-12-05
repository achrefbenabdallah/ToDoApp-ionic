import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.page.html',
  styleUrls: ['./reset-password.page.scss'],
})
export class ResetPasswordPage implements OnInit {

  constructor (private angFireAuth: AngularFireAuth, private router: Router,
    private alerCtrl: AlertController) { }
    ngOnInit() {}

    async resetPassword(f){
    this.angFireAuth.sendPasswordResetEmail(f['email']).then(
      async() => {
      const alert =await this.alerCtrl.create({
      message: "Checkout ur email to reset password",
      buttons: [{text: 'ok', role: 'cancel', handler:() => {
        this.router.navigateByUrl('login');
        }}]
      });
      await alert.present();
    }); 
    }
    
}
