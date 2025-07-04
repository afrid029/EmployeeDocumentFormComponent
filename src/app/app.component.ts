import { Component, OnInit, ViewChild, ViewContainerRef, computed, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { ButtonModule } from 'primeng/button';
import { ReactiveFormComponent } from './Components/reactive-form/reactive-form.component';
import { CommonModule } from '@angular/common';
import { GetDataService } from './Services/get-data.service';
import { DataViewModule } from 'primeng/dataview';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, ButtonModule, ReactiveFormComponent, CommonModule, DataViewModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent implements OnInit {
  title = 'FormComponent';
  visible = signal<boolean>(false);
  users = signal<any[]>([]);
  filteredData = signal<any>({});

   @ViewChild('conatiner', {read: ViewContainerRef, static: true})
  container! : ViewContainerRef;

  /**
   *
   */
  constructor(private dataServ : GetDataService) {}
ngOnInit(): void {
  this.users.set(this.dataServ.getData());
}
  OpenModel(){
    this.visible.set(true);
    // //  this.container?.clear();
    // const dynamicForm = this.container.createComponent(ReactiveFormComponent)
    // dynamicForm.instance.visible = true;

  }

  editId : number | undefined;

  showDialog(Id:number) {
 this.editId = Id;
  const fetched = this.users().filter((p: any) => p.Id == Id)
    this.filteredData.set(fetched[0]);
    this.visible.set(true);
    
  }

  
  onCreate(data: any) {
    console.log(data);
    const Id = this.users().length + 1;
    const newData = { Id: Id, ...data };
    this.users.update((current) => [newData, ...current]);
  }

  onUpdate(data: any) {
    this.users.update((user) =>
      user.map((us) =>
        us.Id === this.editId ? { Id: this.editId, ...data } : us
      )
    );
  }
  
 onClose() {
    this.visible.set(false);
    this.filteredData.set({});
    // this.container.clear();
  }
}
