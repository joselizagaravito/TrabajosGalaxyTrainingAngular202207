import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { EmployeeService } from 'src/app/services/employee.service';
import { Employee } from '../../model/employee.model';

@Component({
  selector: 'app-employee-edit',
  templateUrl: './employee-edit.component.html',
  styleUrls: ['./employee-edit.component.css']
})
export class EmployeeEditComponent implements OnInit {
  form!: FormGroup;
  submited: boolean = false;

  constructor(
    private employeeService: EmployeeService,
    private router: Router,
    private formBuilder: FormBuilder,
    private activatedRoute: ActivatedRoute
  ) {
    this.form = formBuilder.group({
      id: ['', Validators.required],
      name: ['', Validators.required]
    });
  }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe(res => {
      let id = res["id"];

      this.employeeService.getById(id).subscribe(res => {
        this.form.setValue({
          id: res.id,
          name: res.name
        });
      });
    });
  }

  updateEmployee() {
    this.submited = true;

    const employee: Employee = {
      id: this.form.value.id,
      name: this.form.value.name
    }

    this.employeeService.update(employee).subscribe(res => this.router.navigate(['/pages/employeelist']));
  }

}
