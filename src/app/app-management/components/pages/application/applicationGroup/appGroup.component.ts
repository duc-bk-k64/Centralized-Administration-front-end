import { getServerApiUrl,name } from 'src/app/app-constant';
import { HttpClient } from '@angular/common/http';
import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ConfirmationService, MessageService } from 'primeng/api';
import { Response } from 'src/app/app-management/Model/ResponsMessage';
import { AuthService } from 'src/app/app-management/service/auth.service';
import { ApplicationComponent } from '../app.component';

@Component({
    templateUrl: './appGroup.component.html',
    selector: 'app-group'
})
export class AppGroupComponent implements OnInit{
    @Input()
    parentComponent!: ApplicationComponent;
    statusList: any = [{
        'name':'Active',
        'value':1
      },
      {
        'name':'Deactivate',
        'value':0
      }]
      status:any = null;
    constructor(private httpClient:HttpClient,private confirmationService:ConfirmationService, private messageService: MessageService,private router: Router) {

    }
    ngOnInit() {
       
    }
    closeGroupDialog() {
        if(this.status!=null) {
            if(this.status == 1) {
            this.httpClient.post<Response>(getServerApiUrl()+"/app/active?id="+this.parentComponent.selectedApplication.id,null,{headers: this.parentComponent.header}).subscribe({
                next: data => {
                    if(data.resultCode== 0) {
                        this.messageService.add({severity:'success', summary:data.message});
                        this.parentComponent.loadApplication();
                    }
                    else {
                     this.messageService.add({severity:'error', summary:data.message, detail:data.data});
                    }
                   },
                   error: _error => {
                     this.router.navigate(['/auth/error']);
                   }
            })

            }
            else {
                this.httpClient.post<Response>(getServerApiUrl()+"/app/deactive?id="+this.parentComponent.selectedApplication.id,null,{headers: this.parentComponent.header}).subscribe({
                    next: data => {
                        if(data.resultCode== 0) {
                            this.messageService.add({severity:'success', summary:data.message});
                            this.parentComponent.loadApplication();
                        }
                        else {
                         this.messageService.add({severity:'error', summary:data.message, detail:data.data});
                        }
                       },
                       error: _error => {
                         this.router.navigate(['/auth/error']);
                       }
                })
    

            }
        }
        this.parentComponent.showGroupDialog=false;
        this.status=null;
        
    }
    async deleteGroupMapApp(obj:any) {
        await this.httpClient.put<Response>(getServerApiUrl()+"/object/deleteObjectMap",{'object_name':name.App,'map_name':name.Group,'object_id':this.parentComponent.choseApplication.id,'map_id':obj.id},{headers: this.parentComponent.header}).toPromise().then(data => {
            if(data?.resultCode== 0) {
                this.messageService.add({severity:'success', summary:data.message});
                this.parentComponent.findGroup(this.parentComponent.choseApplication);
            }
            else {
             this.messageService.add({severity:'error', summary:data?.message, detail:data?.data});
            }
        })

    }
    
 }