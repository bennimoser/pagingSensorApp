import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { Sensor } from 'src/app/Sensor';
import { BackendService } from 'src/app/shared/backend.service';
import { StoreService } from 'src/app/shared/store.service';
import { DateAdapter } from '@angular/material/core';

@Component({
  selector: 'app-add-sensors-data',
  templateUrl: './add-sensors-data.component.html',
  styleUrls: ['./add-sensors-data.component.scss']
})
export class AddSensorsDataComponent implements OnInit {

  constructor(public storeService: StoreService, private formBuilder: UntypedFormBuilder, public backendService: BackendService, private adapter:DateAdapter<Date>) {
    this.adapter.setLocale('en-GB');
  }
  public sensorenDataForm: FormGroup = new FormGroup({
    sensorId: new FormControl(null, [ Validators.required, Validators.nullValidator ] ),
    temperature: new FormControl('', [ Validators.required, Validators.min(-30), Validators.max(50) ] ),
    humidity: new FormControl('', [ Validators.required, Validators.min(0), Validators.max(100) ] ),
    datetime:  new FormControl(new Date(), [ Validators.required ] )
  });
  public showAddTask: boolean = false;

  public sensoren: Sensor[] = new Array<Sensor>();
  async ngOnInit(): Promise<void> {
    await this.backendService.getSensoren();
    this.sensoren = this.storeService.sensoren;
  }

  async onSubmit() {
    if(this.sensorenDataForm?.valid) {
      // await this.backendService.addSensorsData(this.sensorenDataForm.value);
      // this.sensorenDataForm.reset();
    }
  }

  toggleAddTask() {
    this.showAddTask = !this.showAddTask;
  }

}
