import { ApplicationModel } from './../../../../Model/ApplicationModel';
import { getServerApiUrl, name } from 'src/app/app-constant';
import { HttpClient } from '@angular/common/http';
import { Component, OnInit,Input, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { ConfirmationService, MessageService } from 'primeng/api';
import { Table } from 'primeng/table';
import { Response } from 'src/app/app-management/Model/ResponsMessage';
import { ApplicationComponent } from '../app.component';

@Component({
    templateUrl: './appCategory.component.html',
    selector: 'app-category',
    providers: [ConfirmationService]
})
export class AppCategoryComponent implements OnInit  {
    @ViewChild('dt1') dt1: Table | undefined;
    @Input()
    parentComponent!: ApplicationComponent;
    showDialog: boolean= false;
    applicationModel: ApplicationModel={};
    isUpdate: boolean=false;
    statusList: any = [{
        'name':'Active',
        'value':1
      },
      {
        'name':'Deactivate',
        'value':0
      }]
    groupList: any[] = [];  
    groupSelected: any[] = [];
    label:any;
    isSuccess: boolean = false;
    objectMap: any[] = [];
    appSelected: any[] = [];
    deleteAppConfirm:boolean = false;
    ngOnInit() {
       
    }
    constructor(private httpClient:HttpClient,private confirmationService:ConfirmationService, private messageService: MessageService,private router: Router) {

    }
    applyFilterGlobal($event: any, stringVal: any) {
        this.dt1!.filterGlobal(($event.target as HTMLInputElement).value, stringVal);
      }
    choseApp(obj: any)  {
        this.parentComponent.listApplication.forEach(e => {
            e.hightlightClass = '';
        });
        obj.hightlightClass = 'p-highlight';
        this.parentComponent.findGroup(obj);
        this.parentComponent.choseApplication=obj;
        this.parentComponent.selectedApplication=obj;
        this.parentComponent.showGroupDialog=true;
    }  
    loadDataGroup() {
        this.httpClient.get<Response>(getServerApiUrl()+"/group/",{headers: this.parentComponent.header}).subscribe({
            next: data => {
                if(data.resultCode== 0) {
                 this.groupList =data.data;
                //  console.log(this.groupList);
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
    showCreateDialog() {
        if(this.groupList.length == 0) {
           this.loadDataGroup();
        }
        this.showDialog=true;
        this.isUpdate=false;
        this.label= "Create application";
    }
    showUpdateDialog() {
        if(this.groupList.length == 0) {
            this.loadDataGroup();
        }
        this.showDialog=true;
        this.isUpdate=true;
        this.label= "Update application";
    }
    cancel() {
        this.applicationModel={};
        this.showDialog=false;
        this.groupSelected=[];
    }
    async createApp() {
        await this.httpClient.post<Response>(getServerApiUrl()+"/app/createApp",this.applicationModel,{headers: this.parentComponent.header}).toPromise().then(
            data=> {
                if(data?.resultCode ==0) {
                    this.isSuccess = true;
                    this.applicationModel=data.data;

                }
                else {
                    this.messageService.add({severity:'error', summary:data?.message, detail:data?.data});
                }

            },
            error => {
                this.router.navigate(['/auth/error']);

            }
        )
        if(this.isSuccess&& this.groupSelected.length != 0) {
            for(let i =0; i<this.groupSelected.length;i++) {
                this.objectMap.push({'object_name':name.App,'map_name':name.Group,'object_id':this.applicationModel.id,'map_id':this.groupSelected[i]});
            }
            this.httpClient.post<Response>(getServerApiUrl()+"/object/createListObjectMap",this.objectMap,{headers: this.parentComponent.header}).subscribe({
                next: data => {
                    if(data.resultCode== 0) {
                        this.messageService.add({severity:'success', summary:data.message});
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
        this.parentComponent.loadApplication();
        this.isSuccess = false;
        this.applicationModel={};
        this.showDialog=false;
        this.groupSelected=[];
        this.objectMap = [];

    }
    async deleteApp() {
        for(let i =0; i<this.appSelected.length;i++) {
            await this.httpClient.delete<Response>(getServerApiUrl()+"/app/deleteApp?app_code="+this.appSelected[i].app_code,{headers: this.parentComponent.header}).toPromise().then(data=>{
                if(data?.resultCode== 0) {
                    this.messageService.add({severity:'success', summary:data.message});
                }
                else {
                 this.messageService.add({severity:'error', summary:data?.message, detail:data?.data});
                }
            })
        }
        this.parentComponent.loadApplication();
        this.appSelected=[];
        this.deleteAppConfirm=false;
    }
    confirmDeleteApp() {
       this.deleteAppConfirm=true;
      };
    async updateApp() {
        await this.httpClient.put<Response>(getServerApiUrl()+"/app/updateApp?app_code="+this.applicationModel.app_code,this.applicationModel,{headers: this.parentComponent.header}).toPromise().then(
            data=> {
                if(data?.resultCode ==0) {
                    this.isSuccess = true;
                    this.applicationModel=data.data;

                }
                else {
                    this.messageService.add({severity:'error', summary:data?.message, detail:data?.data});
                }

            },
            error => {
                this.router.navigate(['/auth/error']);

            }
        ) 
        if(this.isSuccess&& this.groupSelected.length != 0) {
            for(let i =0; i<this.groupSelected.length;i++) {
                this.objectMap.push({'object_name':name.App,'map_name':name.Group,'object_id':this.applicationModel.id,'map_id':this.groupSelected[i]});
            }
            this.httpClient.put<Response>(getServerApiUrl()+"/object/updateObjectMapApp?app_id="+this.applicationModel.id,this.objectMap,{headers: this.parentComponent.header}).subscribe({
                next: data => {
                    if(data.resultCode== 0) {
                        this.messageService.add({severity:'success', summary:data.message});
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
        this.parentComponent.loadApplication();
        this.isSuccess = false;
        this.applicationModel={};
        this.showDialog=false;
        this.groupSelected=[];
        this.objectMap = [];


    }  
}