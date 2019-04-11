import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import Swal from "sweetalert2";
import {TelkomapsInterface} from '../../interface/telkomaps.interface';
import {TelkomapsService} from '../../service/telkomaps.service';

@Component({
  templateUrl: './edit.telkomaps.component.html'
})

export class EditTelkomapsComponent implements OnInit{
  public editList: TelkomapsInterface = [] as any;
  public id: number;
  public dataCheckAp_name;
  public dataCheckLoc_id;

  constructor(
    private service: TelkomapsService,
    private activatedRoute: ActivatedRoute,
    private router: Router
  ){}

  ngOnInit(){
    this.activatedRoute.params.subscribe(
      params => {
        this.id = +params['id'];
      }
    );

    this.service.getDataID(this.id)
      .subscribe( res => {
        this.editList = res.data;
      });
  }

  edit(){
    this.service.edit(this.editList)
      .subscribe( res => {
          if (res.status === 1){
            Swal({
              title: 'Update',
              text: 'Your file has been update',
              type: 'success',
              showCancelButton: false,
              confirmButtonText: 'OK'
            }).then( (hasil) => {
              if (hasil.value) {
                this.router.navigate(['/dashboard/telkom-aps']);
              }
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

  checkLoc_id(field, event){
    this.service.exist(field, {except_id: this.id, value: event})
      .subscribe( res => {
          this.dataCheckLoc_id = res.data;
        }
      );
  }

  checkAp_name(field, event){
    this.service.exist(field, {except_id: this.id, value: event})
      .subscribe( res => {
        this.dataCheckAp_name = res.data;
      })
  }
}
