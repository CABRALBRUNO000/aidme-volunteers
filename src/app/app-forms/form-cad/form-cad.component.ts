import { Component, OnInit, OnChanges } from '@angular/core';
import { FormGroup, FormBuilder, NgForm, Validators } from '@angular/forms';
import { VoluntaryService } from 'src/app/services/voluntary.service';
import { VoluntaryModel } from 'src/app/shared/voluntary.model';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-form-cad',
  templateUrl: './form-cad.component.html',
  styleUrls: ['../../app.component.css', './form-cad.component.css'],
  providers: [VoluntaryService],
})
export class FormCadComponent implements OnInit, OnChanges {
  public formulario: FormGroup; // formulario em questão
  public idVoluntary: number = this.route.snapshot.params.id; // se o formulario for acessado pelo perfil do voluntário essa variável recebe o id do voluntario
  public VoluntaryData // e o formulario for acessado pelo perfil do voluntário essa variável recebe os dados do voluntario em questão, o do no id
  public estados = {
    // estados para serem populados no select

    Acre: 'AC',
    Alagoas: 'AL',
    Amapá: 'AP',
    Amazonas: 'AM',
    Bahia: 'BA',
    Ceará: 'CE',
    'Distrito Federal': 'DF',
    'Espírito Santo': 'ES',
    Goiás: 'GO',
    Maranhão: 'MA',
    'Mato Grosso': 'MT',
    'Mato Grosso do Sul': 'MS',
    'Minas Gerais': 'MG',
    Pará: 'PA',
    Paraíba: 'PB',
    Paraná: 'PR',
    Pernambuco: 'PE',
    Piauí: 'PI',
    'Rio de Janeiro': 'RJ',
    'Rio Grande do Norte': 'RN',
    'Rio Grande do Sul': 'RS',
    Rondônia: 'RO',
    Roraima: 'RR',
    'Santa Catarina': 'SC',
    'São Paulo': 'SP',
    Sergipe: 'SE',
    Tocantins: 'TO',
  };
  campoForm: any
  pathImg: any;

  constructor(
    private voluntaryService: VoluntaryService,
    private formBuilder: FormBuilder,
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {
    console.log("id que foi restgatado da uri", this.idVoluntary)
    this.formulario = this.formBuilder.group({
      id: [null],
      nome: [null, [Validators.required, Validators.minLength(3)]],
      sexo: [null, [Validators.required]],
      dataNascimento: [null, [Validators.required]],
      profissao: [null, [Validators.required]],
      cepVo: [null],
      logradouroVo: [null],
      numeroVo: [null],
      bairroVo: [null],
      cidadeVo: [null],
      ufVo: [null],
      complementoVo: [null],
      CEPVo: [null],
      instituicao: [null],
      nomeIg: [null, [Validators.required]],
      telefoneIg: [null],
      cepIg: [null],
      logradouroIg: [null],
      numeroIg: [null],
      bairroIg: [null],
      cidadeIg: [null],
      complementoIg: [null],
      ufIg: [null],
      pastor: [null, [Validators.required]],
      telefonePa: [null],
      cepPa: [null],
      logradouroPa: [null],
      numeroPa: [null],
      cidadePa: [null],
      bairroPa: [null],
      complementoPa: [null],
      ufPa: [null],
      servicoOferecido: [null, Validators.required],
      disponibilidade: [null, Validators.required],
      assiduidade: [null],
      diponivel: [null],
      outrasInformacoes: [null],
      email: [null, [Validators.required, Validators.email]],
      telefoneVo: [null],
      imgUrl: [this.pathImg],
      dataCad: [null],
    });

    this.PopulaDataVoluntary(this.idVoluntary)


  }
  ngOnChanges(){
    
  }
  getPathImage(event) {
   // console.log("nome puro",event.path[0].value)
 
    let path = event.target.value
    let splitPath = path.split("\\")
    let nomeArquivo = splitPath[2]
    let pathAjustado = `/mnt/C/Users/Bruno/Projetos/Angular/voluntary/src/assets/${nomeArquivo}`
    this.pathImg = pathAjustado.toString()
    console.log(this.pathImg)
  }

  onSubmit() {
    if (this.formulario.valid) {
      if (!this.idVoluntary) {
        this.salveVoluntaryCTRL()
      } else {
        this.UpdateVoluntaryCTRL(this.formulario.value)
        console.log("dados do voluntario que foram enviado para o service", this.VoluntaryData)
        console.log("dados que sairam do formulario e estão sendo enviados", this.formulario.value)


      }
    } else {
      console.log('formulario invalido');
      Object.keys(this.formulario.controls).forEach(campo => {
        const controle = this.formulario.get(campo)
        controle.markAsTouched()



      })
    }
  }

  PopulaDataVoluntary(idVoluntary) {
    this.voluntaryService.getVolunteersPorId(idVoluntary) // pega esse id e busca os dados dele no banco
      .then((resposta: VoluntaryModel) => {
        this.VoluntaryData = resposta; // pega a resposta dos dados e coloca dentro de uma variável chamada voluntary
        console.log("o que foi pego do banco de dados", this.VoluntaryData)
        this.populaDadosForm(this.VoluntaryData); // chama o método e passa todos os dados desse voluntário para que ele popule ele dentro do formulario

      })
  }
  //atualiza os dados dos
  public UpdateVoluntaryCTRL(VoluntaryDataFormUpdated) {

    this.voluntaryService.updateVoluntaryID(VoluntaryDataFormUpdated)
      .subscribe((voluntary) =>
        alert(`Os dados do ${voluntary.nome} foram salvos com sucesso`)
      );
  }

  // se não, cadastre como um novo voluntário
  public salveVoluntaryCTRL() {
    if (this.formulario !== undefined) {
      this.voluntaryService.saveVoluntary(this.formulario.value).subscribe(
        (voluntary) => this.formulario.reset(),
        (err: any) =>
          alert(
            `O voluntário não pode ser cadastrado, ocorreu o seguinte erro ${err}`
          )
      );
    }
  }


  // FUNÇÕES DE VALIDAÇÃO DE FORMULÁRIO

  public aplicaCss(campo) {

    return {
      incorreto: this.formulario.get(campo).invalid && (this.formulario.get(campo).touched || this.formulario.get(campo).dirty),
      correto: this.formulario.get(campo).valid
    };
  }

  public populaDadosForm(dataVoluntary) {
    this.formulario.patchValue({
      id: dataVoluntary.id,
      nome: dataVoluntary.nome,
      sexo: dataVoluntary.sexo,
      dataNascimento: dataVoluntary.dataNascimento,
      profissao: dataVoluntary.profissao,
      cepVo: dataVoluntary.cepVo,
      logradouroVo: dataVoluntary.logradouroVo,
      telefoneVo: dataVoluntary.telefoneVo,
      numeroVo: dataVoluntary.numeroVo,
      bairroVo: dataVoluntary.bairroVo,
      cidadeVo: dataVoluntary.cidadeVo,
      ufVo: dataVoluntary.ufVo,
      complementoVo: dataVoluntary.complementoVo,
      CEPVo: dataVoluntary.CEPVo,
      instituicao: dataVoluntary.instituicao,
      nomeIg: dataVoluntary.nomeIg,
      telefoneIg: dataVoluntary.telefoneIg,
      cepIg: dataVoluntary.cepIg,
      logradouroIg: dataVoluntary.logradouroIg,
      numeroIg: dataVoluntary.numeroIg,
      bairroIg: dataVoluntary.bairroIg,
      cidadeIg: dataVoluntary.cidadeIg,
      complementoIg: dataVoluntary.complementoIg,
      ufIg: dataVoluntary.ufIg,
      pastor: dataVoluntary.pastor,
      telefonePa: dataVoluntary.telefonePa,
      cepPa: dataVoluntary.cepPa,
      logradouroPa: dataVoluntary.logradouroPa,
      numeroPa: dataVoluntary.numeroPa,
      cidadePa: dataVoluntary.cidadePa,
      bairroPa: dataVoluntary.bairroPa,
      complementoPa: dataVoluntary.complementoPa,
      ufPa: dataVoluntary.ufPa,
      servicoOferecido: dataVoluntary.servicoOferecido,
      disponibilidade: dataVoluntary.disponibilidade,
      assiduidade: dataVoluntary.assiduidade,
      diponivel: dataVoluntary.diponivel,
      outrasInformacoes: dataVoluntary.outrasInformacoes,
      email: dataVoluntary.email,
       imgUrl: dataVoluntary.imgUrl,
      dataCad: dataVoluntary.dataCad,
    });

  }
}

/*documentos de consulta
      https: //www.ramosdainformatica.com.br/programacao/angularjs/como-usar-api-rest-com-httpclient-no-angular-8/
      https: //medium.com/@fernandoevangelista_28291/consumindo-api-rest-com-httpclient-no-angular-8-62c5d733ffb6
*/
