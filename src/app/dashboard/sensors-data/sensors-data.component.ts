import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { SensorPosition } from 'src/app/Sensor';
import { Sensorendata } from 'src/app/Sensorendata';
import { BackendService } from 'src/app/shared/backend.service';
import { StoreService } from 'src/app/shared/store.service';
import { AddSensorsDataComponent } from '../add-sensors-data/add-sensors-data.component';

@Component({
  selector: 'app-sensors-data',
  templateUrl: './sensors-data.component.html',
  styleUrls: ['./sensors-data.component.scss']
})
export class SensorsDataComponent implements OnInit {

  public displayedColumns: string[] = ['name', 'date', 'temperature', 'humidity', 'location', 'buttons'];

  public dataSource: Sensorendata[] = new Array<Sensorendata>();

  public pageIndex: number = 1;

  public length: number = 0;

  public pageSize: number = 5;

  public pageSizeOptions: number[] = [5,10,15,25];

  public get SensorPosition() {return SensorPosition; }

  constructor(private backendService: BackendService, public storeService: StoreService) { }

  async ngOnInit() {
    await this.backendService.getSensoren();
    this.length = await this.backendService.getSensorenDatenByPage(this.pageIndex,this.pageSize);
    this.dataSource = this.storeService.sensorenDaten;
  }

  async deleteSensordata(id: number) {
    await this.backendService.deleteSensorsDaten(id);
  }

  async selectPage(event:PageEvent){
    console.log(event);
    this.pageSize = event.pageSize;
    this.pageIndex = event.pageIndex + 1;
    this.dataSource = new Array<Sensorendata>();
    this.length = await this.backendService.getSensorenDatenByPage(this.pageIndex,this.pageSize);
    console.log(this.storeService.sensorenDaten);
    this.dataSource = this.storeService.sensorenDaten;
  }
}
