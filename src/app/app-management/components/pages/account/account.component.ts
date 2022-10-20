import { Response } from './../../../Model/ResponsMessage';
import { Router } from '@angular/router';
import { HttpHeaders } from '@angular/common/http';
import { AuthService } from './../../../service/auth.service';
import { getServerApiUrl, storageKey} from './../../../../app-constant';
import { MessageService, ConfirmationService } from 'primeng/api';
import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Account } from 'src/app/app-management/Model/Account';
@Component({
  selector: 'app-account',
  templateUrl: './account.component.html'
})
export class AccountComponent implements OnInit {
  accountList :any[]=[];
  header: any;
  listSelection: any[] =[];
  showCreateDialog: Boolean = false;
  account: any = null;
  accountModel: Account =   {
   
  }
  updateAccount: any;
  roleList: any[]= [];
  permissionList: any[] = [];
  permissionSelected: any[]=[];
  roleSelected: any[] = [];
  showUpdateDialog: Boolean = false;
  statusList: any = [{
    'name':'Active',
    'value':1
  },
  {
    'name':'Deactivate',
    'value':0
  }]
  isSuccess: boolean = false;
  

  constructor(private httpClient:HttpClient,private confirmationService:ConfirmationService, private messageService: MessageService,private authService: AuthService,private router: Router) { }

  ngOnInit(): void {
    this.header = new HttpHeaders().set(storageKey.AUTHORIZATION,this.authService.getToken());
    this.loadAccount();
    this.loadDataAccount();
    // this.awaitfunction();
  }
  loadAccount() {
    this.httpClient.get<Response>(getServerApiUrl()+"/allAccount",{headers: this.header}).subscribe({
      next: data => {
       if(data.resultCode== 0) {
        this.accountList =data.data;
        // console.log(this.accountList);
       }
       else {
        this.messageService.add({severity:'error', summary:data.message});
       }
      },
      error: _error => {
        this.router.navigate(['/auth/error']);
      }
    });

  }
  loadDataAccount() {
    this.httpClient.get<any>(getServerApiUrl()+"/role",{headers: this.header}).subscribe({
      next: data => {
       if(data.resultCode== 0) {
        this.roleList =data.data;
        // console.log(this.roleList);
       }
       else {
        this.messageService.add({severity:'error', summary:data.message});
       }
      },
      error: _error => {
        this.router.navigate(['/auth/error']);
      }
    });
    this.httpClient.get<any>(getServerApiUrl()+"/permission",{headers: this.header}).subscribe({
      next: data => {
       if(data.resultCode== 0) {
        this.permissionList =data.data;
        // console.log(this.permissionList);
       }
       else {
        this.messageService.add({severity:'error', summary:data.message});
       }
      },
      error: _error => {
        this.router.navigate(['/auth/error']);
      }
    });

  }
  getDataAccount() {
    this.loadDataAccount();
    this.showCreateDialog=true;
    
  }
  cancel() {
    this.account = undefined;
    this.accountModel={};
    this.roleSelected = [];
    this.permissionSelected = [];
    this.showCreateDialog = false;
  }
  cancelUpdate() {
    this.accountModel ={};
    this.roleSelected = [];
    this.permissionSelected = [];
    this.showUpdateDialog = false;
    this.account = null;
  }
  async createAccount() {
    await this.httpClient.post<any>(getServerApiUrl()+"/createAccount",this.accountModel,{headers: this.header}).toPromise().then(
       data => {
        if(data.resultCode == 0 || data.resultCode=='0') {
          // this.messageService.add({severity:'success', summary:data.message})
          this.account = data.data;
          // this.success = true;
          // console.log(data);
         
        }
        else{
          this.messageService.add({severity:'error', summary:data.message,detail:data.data});
          // console.log(data);
        }

      },
     error => {
        this.router.navigate(['/auth/error']);

      }
    )
    if(this.account!=null) {
      let role_per = this.roleSelected.concat(this.permissionSelected);
      await this.httpClient.post<any>(getServerApiUrl()+"/addRole",{'username':this.account.username,'role':role_per},{headers: this.header}).toPromise().then(

          rs => {
          if(rs.resultCode == 0) {
            this.messageService.add({severity:'success', summary:rs.message, detail:"Create successfully"})
            this.loadAccount();
            this.accountModel={}
            this.roleSelected = [];
            this.permissionSelected = [];
          }
          else{
            this.messageService.add({severity:'error', summary:rs.data,detail:rs.data});
          }
  
        },
        error => {
          this.router.navigate(['/auth/error']);
  
        }
      
      )


    }

    this.account = null;
    this.showCreateDialog = false;
   
  }
  async deleteAccount(data: any) {
    await this.httpClient.post<any> (getServerApiUrl()+"/deleteAccountMap?username="+data.username,null,{headers: this.header}).toPromise().then(
       rs=> {
        if(rs.resultCode == 0) {
          this.isSuccess=true;
       
        } else {
          console.log(rs);
          this.messageService.add({severity:'error', summary:rs.message,detail: rs.data});

        }

      },
      error => {
        this.router.navigate(['/auth/error']);

      }
    )
    if(this.isSuccess) {
       this.httpClient.delete<any>(getServerApiUrl()+"/deleteAccount?username="+data.username,{headers: this.header}).subscribe({
        next: result => {
        
            if(result.resultCode == 0) {
              this.messageService.add({severity:'success', summary:result.message, detail:result.data});
              this.loadAccount();
            }
            else{
              // console.log(result);
              this.messageService.add({severity:'error', summary:result.message, detail:result.data});
            
          }

        },
        error: error=> {
          this.router.navigate(['/auth/error']);

        }
      })

    }
    this.isSuccess=false;
  }
  confirmDelete(data:any) {
    this.confirmationService.confirm({
      message: 'Are you sure that you want to delete?',
      header: 'Confirmation',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
          this.deleteAccount(data);
      },
      reject: () => {
          
          }
      });
  };
  showUpdateForm(data:any) {
    this.accountModel.userName= data.username;
    this.showUpdateDialog=true;
  }
  updateAccountFunc() {
    this.accountModel.role =this.roleSelected.concat(this.permissionSelected);
    // console.log(this.accountModel);
    this.httpClient.put<any>(getServerApiUrl()+"/updateAccount",this.accountModel,{headers: this.header}).subscribe({
      next: data => {
        if(data.resultCode == 0) {
          this.messageService.add({severity:'success', summary:data.message});
          this.loadAccount();
        }
        else {
          this.messageService.add({severity:'error', summary:data.message, detail:data.data});
        }
      },
      error: error=> {
        this.router.navigate(['/auth/error']);
      }
    })
    this.accountModel={}
    this.roleSelected = [];
    this.permissionSelected = [];
    this.showUpdateDialog= false;

  }
  // async awaitfunction() {
  //   await this.httpClient.get<Response>(getServerApiUrl()+"/user/getUserByGroupId?id=3",{headers: this.header}).toPromise().then(data=> {
  //     console.log(data);
  //   },
  //   error => {
  //     this.router.navigate(['/auth/error']);
  //   });
  //   console.log("end");
  // }
  
  

}
