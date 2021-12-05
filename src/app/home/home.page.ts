import { Component, OnInit } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/compat/database';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { ActivatedRoute } from '@angular/router';



@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit{
  id: string;
  nb: number=0;
  constructor(public angFireDb:AngularFireDatabase,private activatedRoute:ActivatedRoute,
              private angAuth:AngularFireAuth) {}

  ngOnInit() {
    this.activatedRoute.paramMap.subscribe(
      (p)=>{
        this.id=p.get('id');
      }
    );
    this.getTasks();
  }
  getTasks(){
    this.angFireDb.list('Tasks/').snapshotChanges(['child_added','child_moved']).subscribe(
      (reponse)=>{
        reponse.forEach(element=>{
          if(element.payload.exportVal().userId==this.id && element.payload.exportVal().checked==false)
          this.nb=this.nb+1;
        })
      }
    )
  }

}
