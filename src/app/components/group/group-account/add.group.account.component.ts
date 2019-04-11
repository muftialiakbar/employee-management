import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';

import Swal from "sweetalert2";

import * as moment from 'moment';
import {GroupAccountService} from '../../../service/group.account.service';
import {GroupAccountInterface} from '../../../interface/group.account.interface';


@Component({
  templateUrl: './add.group.account.component.html'
})

export class AddGroupAccountComponent implements OnInit{
  public dataAdd: GroupAccountInterface = {} as any;
  public dataDate: GroupAccountInterface = {} as any;
  // public ppid: number;
  public pid: number;
  public dataCheckName;
  public dataCheckEmail;

  constructor(
    private service: GroupAccountService,
    private activatedRoute: ActivatedRoute,
    private router : Router
  ){}

  ngOnInit(){
    this.dataAdd.gender = "00";
    this.dataAdd.type = "00";
    this.dataAdd.isSuspend = 0;
    this.dataAdd.isActive = 0;
    this.activatedRoute.params.subscribe(
      params => {
        // this.ppid = +params['ppid'];
        /*console.log(this.pid);*/
        this.pid = +params['pid'];
      }
    );
  }

  add(e){
    if(this.dataDate.birthdate != null){
      this.dataAdd.birthdate = moment(this.dataDate.birthdate).format('YYYY-MM_DD');
    }
    this.dataAdd.group_id = this.pid;
    this.service.add(this.dataAdd, this.pid)
      .subscribe(res => {
          if (res.status === 1){
            Swal({
              title: 'Insert',
              text: 'Insert Success',
              type: 'success',
              showCancelButton: false,
              confirmButtonText: 'OK'
            }).then((hasil) => {
              if (hasil.value) {
                this.router.navigate(['/dashboard/group/',this.pid,'account']);
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

  checkEmail(field, event){
    this.service.exist(field, {value: event})
      .subscribe( res => {
          this.dataCheckEmail = res.data;
        }
      );
  }

  checkName(field, event){
    this.service.exist(field, {value: event})
      .subscribe( res => {
          this.dataCheckName = res.data;
        }
      );
  }
}
