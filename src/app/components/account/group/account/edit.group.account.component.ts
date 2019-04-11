import {Component} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {GroupAccountService} from '../../../../service/group.account.service';
import Swal from "sweetalert2";
import {GroupAccountInterface} from '../../../../interface/group.account.interface';
import * as moment from 'moment';

@Component({
  templateUrl: './edit.group.account.component.html'
})

export class EditGroupAccountComponent {
  public editList: GroupAccountInterface = {} as any;
  public dataDate: GroupAccountInterface = {} as any;
  public id: number;
  public pid: number;
  public ppid: number;
  public dataCheckName;
  public dataCheckEmail;

  constructor(
    private service: GroupAccountService,
    private activatedRoute: ActivatedRoute,
    private router : Router
  ){}

  ngOnInit(){
    this.activatedRoute.params.subscribe(
      params => {
        this.id = +params['id'];
        this.pid = +params['pid'];
        this.ppid = +params['ppid'];
      }
    );

    this.service.getDataID(this.pid, this.id)
      .subscribe( res => {
        this.editList = res.data;
        this.dataDate.birthdate = res.data.birthdate;
      });
  }

  edit(){
    if(this.dataDate.birthdate != null){
      this.editList.birthdate = moment(this.dataDate.birthdate).format('YYYY-MM_DD');
    }
    this.service.edit(this.editList, this.pid)
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
              this.router.navigate(['/dashboard/account/',this.ppid,'group',this.pid,'account']);
            }
          });
        }else{
          Swal(
            'Oops...',
            res.status_message,
            'error'
          );
        }
      });
  }

  checkEmail(field, event){
    this.service.exist(field, {except_id: this.id, value: event})
      .subscribe( res => {
          this.dataCheckEmail = res.data;
        }
      );
  }

  checkName(field, event){
    this.service.exist(field, {except_id: this.id, value: event})
      .subscribe( res => {
          this.dataCheckName = res.data;
        }
      );
  }
}
