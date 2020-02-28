import { Component, OnInit } from '@angular/core';
import Swal from "sweetalert2";
import {ApplicationInterface} from '../../../interface/application.interface';
import {ActivatedRoute, Router} from '@angular/router';
import {ApplicationService} from '../../../service/application.service';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.scss']
})
export class EditComponent implements OnInit {

  public editList: ApplicationInterface = {} as any;
  public id: number;
  public dataCheckName;

  constructor(
    private service: ApplicationService,
    private activatedRoute: ActivatedRoute,
    private router: Router
  ){}

  ngOnInit(){
    this.activatedRoute.params.subscribe(
      params => {
        this.id = +params['id'];
      }
    );


    return this.service.getDataID(this.id)
      .subscribe( res => {
        this.editList = res.data;
      });
  }

  edit(){
    this.service.edit(this.id,this.editList)
      .subscribe( res => {
          if (res.status === 1){
            Swal({
              title: 'Update',
              text: 'Your file has been update',
              type: 'success',
              showCancelButton: false,
              confirmButtonText: 'OK'
            }).then( (hasil) => {
              this.router.navigate(['']);
            });
          }else{
            Swal(
              'Oops...',
              res.status_message,
              'error'
            );
          }
        }
      );
  }
}
