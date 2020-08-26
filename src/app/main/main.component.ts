import { Component, OnInit, Injectable, Input, } from '@angular/core';
import {VoluntaryService} from '../services/voluntary.service'
import {VoluntaryModel} from './../shared/voluntary.model'
import { ActivatedRoute } from "@angular/router";
import { Observable, Subject, of } from 'rxjs';
import { switchMap, debounceTime, distinctUntilChanged } from 'rxjs/operators'



@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css'],
  providers:[VoluntaryService]
})
@Injectable()
export class MainComponent implements OnInit {

   public volunteers:VoluntaryModel[]
   public voluntary:VoluntaryModel
   public volunteersObservable:Observable<VoluntaryModel[]>
   private subjectPesquisa:Subject<String> = new Subject<String>()
   

  constructor( 
    private VoluntaryService: VoluntaryService,
    private route:ActivatedRoute
    ) {}
    
    
   ngOnInit(): void {

    this.VoluntaryService.getVolunteers()
      .then((resposta:VoluntaryModel[])=> this.volunteers = resposta)
      .catch((err)=> console.log("ERRO", err) )

      this.volunteersObservable = this.subjectPesquisa
      .pipe(debounceTime(1000))
      .pipe(distinctUntilChanged()) 
      .pipe(switchMap((termo:string)=>{
      
        return this.VoluntaryService.pesquisaVoluntary(termo)

      }))
        
      this.volunteersObservable.subscribe(
        (volunteers:VoluntaryModel[]) => this.volunteers = volunteers,
        (error:any) => console.log(error),
        () => console.log('Evento comcluido')
      ) 
      }
    
     public pesquisa(termoDaPesquisa:String):void{
       this.subjectPesquisa.next(termoDaPesquisa)

     }

}