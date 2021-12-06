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
  //le variable de nbr des taches 
  nbr_tache: number=0;
  constructor(public afDdb:AngularFireDatabase,private activatedRoute:ActivatedRoute){}

  ngOnInit() {
    this.activatedRoute.paramMap.subscribe(
      (p)=>{
        this.id=p.get('id');
      }
    );
    //appel de fonction getTasks() lors de l'initialisation de page pour afficher les taches qui est déja enregistrer
    this.getTasks();
  }
  getTasks(){
    this.afDdb.list('Tasks/').snapshotChanges(['child_added','child_moved']).subscribe(
      (reponse)=>{
        reponse.forEach(element=>{
          //la fonction payload et exportval se sont des fonctions 
          if(element.payload.exportVal().userId==this.id && element.payload.exportVal().checked==false)
          this.nbr_tache=this.nbr_tache +1;
        })
      }
    );
  }
}
