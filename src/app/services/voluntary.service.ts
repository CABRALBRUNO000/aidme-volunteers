import {VoluntaryModel} from '../shared/voluntary.model';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Injectable} from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { map, retry, catchError } from 'rxjs/operators';


@Injectable()
export class VoluntaryService {

    //public url: string = `http://localhost:3000/volunteers?`;
    public url: string = `http://localhost:3000`;

    constructor(private http:HttpClient){};

    // pega todos os voluntários
    public getVolunteers():Promise<VoluntaryModel[]>{

        return this.http.get(`${this.url}/volunteers`)
        .toPromise()
        .then((resposta:VoluntaryModel[])=> resposta)
    }
        // Busca os dados do voluntário pelo seu ID
    public getVolunteersPorId(id:number): Promise<VoluntaryModel>{
        return this.http.get(`${this.url}/volunteers?id=${id}`)
        .toPromise()
        .then((resposta: any)=> {
            return resposta[0]})
        .catch((err)=> console.log("ERRO", err) )
    }


        // CAMPO DE BUSCA na tela principal
    public pesquisaVoluntary(termo:string): Observable<VoluntaryModel[]>{
        return this.http.get(`${this.url}/volunteers?nome_like=${termo}`)
        .pipe(retry(10))
        .pipe(map((resposta:any) => resposta))
    }

     // Headers par afazer o post de o put
    httpOptions = {headers: new HttpHeaders({ 'Content-Type': 'application/json' })};

    // CADASTRO VOLUNTÁRIOS
    public saveVoluntary(voluntary:VoluntaryModel):Observable<VoluntaryModel>{
        return this.http.post<VoluntaryModel>(`${this.url}/volunteers`,
        JSON.stringify(voluntary), this.httpOptions)
        .pipe(
            retry(2),
            catchError(this.handleError)
        );
    }

        // Atualiza um voluntário
    public updateVoluntaryID(voluntary:VoluntaryModel):Observable<VoluntaryModel>{
        return this.http.put<VoluntaryModel>(`${this.url}/volunteers/${voluntary.id}`,
        JSON.stringify(voluntary), this.httpOptions)
        .pipe(
            retry(2),
            catchError(this.handleError)
        );
    }

     // deleta um voluntário
  public deleteVoluntary(voluntary:VoluntaryModel) {
    return this.http.delete<VoluntaryModel>(`${this.url}voluntary/${voluntary.id}`
    ,this.httpOptions)
        .pipe(
        retry(1),
        catchError(this.handleError)
      )}


    // Manipulação de erros
    public handleError(error: HttpErrorResponse) {
        let errorMessage = '';
        if (error.error instanceof ErrorEvent) {
            // Erro ocorreu no lado do client
            errorMessage = error.error.message;
        } else {
            // Erro ocorreu no lado do servidor
            errorMessage = `Código do erro: ${error.status}, ` + `mensagem: ${error.message}`;
        }
        console.log(errorMessage);
        return throwError(errorMessage);
    };

}



