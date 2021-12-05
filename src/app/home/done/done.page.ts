import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AngularFireDatabase } from '@angular/fire/compat/database';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-done',
  templateUrl: './done.page.html',
  styleUrls: ['./done.page.scss'],
})
export class DonePage implements OnInit {
  currentDate:string;
  myTask = "";
  show : boolean = false;
  tasks=[];
  id : string;

  constructor(public angFireDb:AngularFireDatabase ,
     public activatedRoute : ActivatedRoute,private angAuth:AngularFireAuth,
     private router : Router) {
       const date=new Date();
       this.currentDate=DatePipe.toString()
      }

  ngOnInit() {
    this.activatedRoute.paramMap.subscribe(
      (p)=>{
        this.id=p.get('id');
        this.getTasks();
      }
    )
  }

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
  showForm(){
    this.show = !this.show;
    this.myTask='';
  }

  getTasks(){
    this.angFireDb.list('Tasks/').snapshotChanges(['child_added','child_moved']).subscribe(
      (reponse)=>{
        this.tasks=[];
        reponse.forEach(element=>{
          if(element.payload.exportVal().userId==this.id&&element.payload.exportVal().checked==true)
          this.tasks.push({
            key:element.key,
            text:element.payload.exportVal().text(),
            date:element.payload.exportVal().date.substring(),
            checked : element.payload.exportVal().checked
          })
        })
      }
    );
  }

  changeCheckState(t){
    this.angFireDb.object('Tasks/'+t.key+'/checked').set(t.checked);
  }
  deleteTask(t){
    this.angFireDb.list('Tasks/').remove(t.key);
    this.ngOnInit();
  }
  logout(){
    this.angAuth.signOut().then(
      ()=>{
        localStorage.removeItem('mytoken');
        this.router.navigateByUrl("/");
      }
    );
  }

}
