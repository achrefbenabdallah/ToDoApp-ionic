import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AngularFireDatabase } from '@angular/fire/compat/database';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-to-do',
  templateUrl: './to-do.page.html',
  styleUrls: ['./to-do.page.scss'],
})
export class ToDoPage implements OnInit {
  currentDate:string;
  myTask = "";
  show : boolean = false;
  tasks=[];
  id : string;

  constructor(public angFireDb:AngularFireDatabase ,public activatedRoute : ActivatedRoute,private angAuth:AngularFireAuth,private router : Router) {
       const date=new Date();
       this.currentDate = date.toLocaleDateString();
       //this.currentDate=DatePipe.toString()
  }

  ngOnInit() {
    this.activatedRoute.paramMap.subscribe(
      (p)=>{
        this.id=p.get('id');
        //fonction pour avoir les taches du firebase au cet utilisateur spécifier avec le variable id
        this.getTasks();
      }
    )
  }
//fonction pour pusher une tache au liste des taches qui stocker dans le firebase 
  addTask(){
    this.angFireDb.list('Tasks/').push({
      userId : this.id,
      text:this.myTask,
      date: new Date().toISOString(),
      checked: false
    });
    this.myTask = '';
    this.ngOnInit();
  }
  //pour afficher les taches qui a le valeur boolean true
  showForm(){
    this.show = !this.show;
    this.myTask='';
  }
//recupérer les taches à partir de firebase avec le angualr/fire pour l'utilisateur spécifier avec l'id
  getTasks(){
    this.angFireDb.list('Tasks/').snapshotChanges(['child_added','child_moved']).subscribe(
      (reponse)=>{
        this.tasks=[];
        reponse.forEach(element=>{
          if(element.payload.exportVal().userId == this.id)
          this.tasks.push({
            key:element.key,
            text:element.payload.exportVal().text,
            date:element.payload.exportVal().date.substring(11,16),
            checked : element.payload.exportVal().checked
          })
        })
      }
    );
  }
//fonction pour changer le status de taches quand on clique sur le checkbox 
  changeCheckState(t){
    this.angFireDb.object('Tasks/'+t.key+'/checked/').set(t.checked);
  }
  //fonction logout a l'aide de module angular/fire
  logout(){
    this.angAuth.signOut().then(
      ()=>{
        localStorage.removeItem('mytoken');
        this.router.navigateByUrl("/");
      }
    );
  }

}
