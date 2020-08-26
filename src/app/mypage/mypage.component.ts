import { Component, OnInit, Input } from '@angular/core';
import {VoluntaryService} from '../services/voluntary.service'
import {VoluntaryModel} from './../shared/voluntary.model'
import { ActivatedRoute} from '@angular/router'


@Component({
  selector: 'app-mypage',
  templateUrl: './mypage.component.html',
  styleUrls: ['./mypage.component.css'],
  providers:[VoluntaryService]
})
export class MypageComponent implements OnInit {

  public volunteers:VoluntaryModel[];
  public idVoluntary:VoluntaryModel



  constructor(
    private VoluntaryService:VoluntaryService,
    private route:ActivatedRoute
    ) {}

  ngOnInit(): void {
    this.VoluntaryService.getVolunteersPorId(this.route.snapshot.params['id'])
    .then((resposta:VoluntaryModel)=> {
      this.idVoluntary = resposta})
      .catch((err)=> console.log("ERRO", err) )
  }

}
