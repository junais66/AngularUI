import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import {EmployeeService} from '../../services/employee.service'
import {Employee} from '../../shared/employeemodel'
import Swal from 'sweetalert2';

@Component({
  selector: 'app-employedetail',
  templateUrl: './employedetail.component.html',
  styleUrls: ['./employedetail.component.css']
})
export class EmployedetailComponent implements OnInit{

  formData:any={};
  employeeId: any;
  employeeForm!: FormGroup;
  isSubmitted: boolean = false;
  employees: Employee[] = [];
  showEmployeeForm: boolean = false;
  showEmployeeList: boolean = true;
  selectedEmployee: Employee | null = null;

  constructor(private formBuilder: FormBuilder, private employeeService: EmployeeService) { }

  ngOnInit(): void {
    this.getEmployees();
    this.initialiseForm();
  }

  initialiseForm() {
    this.employeeForm = this.formBuilder.group({
      id: ['', Validators.required], // Make sure to include validators if needed
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      dateOfBirth: ['', Validators.required], // You might need to handle date format and validation
      designation: ['', Validators.required],
      salary: ['', Validators.required],
      status: [true, Validators.required] 
    });
  }
  toggleEmployeeForm(): void {
    this.showEmployeeForm = !this.showEmployeeForm;
    this.showEmployeeList = !this.showEmployeeForm;
  }
  cancelForm() {
    this.employeeForm.reset();
    this.showEmployeeForm = false;
    this.showEmployeeList = true;
}


  editEmployee(employee: Employee): void {
    this.showEmployeeForm = true;
    this.showEmployeeList = false;
    this.selectedEmployee = employee; // Store the selected employee for editing
    // Populate the form fields with the selected employee's data
    this.employeeForm.patchValue({
        id: employee.id,
        name: employee.name,
        email: employee.email,
        dateOfBirth: employee.dateOfBirth,
        designation: employee.designation,
        salary: employee.salary,
        status: employee.status
    });
}

deleteEmployee(id: number): void {
  Swal.fire({
    title: 'Are you sure?',
    text: 'You will not be able to recover this employee!',
    icon: 'warning',
    showCancelButton: true,
    confirmButtonText: 'Yes, delete it!',
    cancelButtonText: 'No, keep it'
  }).then((result) => {
    if (result.value) {
      this.employeeService.deleteEmployee(id).subscribe(
        (res: any) => {
          Swal.fire(
            'Deleted!',
            'Employee has been deleted.',
            'success'
          );
          // Refresh employee list
          this.getEmployees();
        },
        (error: any) => {
          console.log(error);
        }
      );
    }
  });
}
  saveEmployee() {
    if (this.employeeForm.valid) {
      const employeeData = this.employeeForm.value;
      if (this.selectedEmployee) {
        this.updateEmployee(employeeData);
      } else {
        this.createEmployee(employeeData);
      }
    } else {
      this.employeeForm.markAllAsTouched();
    }
  }

  createEmployee(employeeData: Employee) {
    this.employeeService.saveEmployeeData(employeeData).subscribe(
      (res: any) => {
        Swal.fire({
          icon: 'success',
          title: 'Success',
          text: 'Employee Details Submitted Successfully'
        });
        console.log('Employee saved successfully:', res);
        this.employeeForm.reset();
        this.getEmployees();
        this.showEmployeeList = true;
        this.showEmployeeForm = false;
      },
      (error: any) => {
        console.error('Error saving employee:', error);
      }
    );
  }

  updateEmployee(employeeData: Employee) {
    this.employeeService.updateEmployee(employeeData).subscribe(
      (res: any) => {
        Swal.fire({
          icon: 'success',
          title: 'Success',
          text: 'Employee Details Updated Successfully'
        });
        console.log('Employee updated successfully:', res);
        this.employeeForm.reset();
        this.getEmployees();
        this.showEmployeeList = true;
        this.showEmployeeForm = false;
      },
      (error: any) => {
        console.error('Error updating employee:', error);
      }
    );
  }


  getEmployees(): void {
    this.employeeService.getAllEmployees().subscribe(
      (res: any) => {
        debugger
        if (res) { // Check if response object exists
          debugger
          console.log(res);
          this.employees = res; // Assign response object to dashboardData
        }
      },
      (error: any) => {
        debugger
        console.log(error);
      }
    );
  }

  // Function to get max date (today's date) for date picker
  maxDate(): string {
    return new Date().toISOString().split('T')[0];
  }
}
