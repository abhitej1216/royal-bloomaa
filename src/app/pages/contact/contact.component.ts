import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';

@Component({
  selector: 'app-contact',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule
  ],
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.scss']
})
export class ContactComponent {
  formData = {
    name: '',
    email: '',
    phone: '',
    inquiryType: '',
    message: ''
  };

  constructor(private http: HttpClient) {}

  onSubmit() {
    this.http.post(`${environment.apiUrl}/api/contact`, this.formData)
      .subscribe({
        next: (response) => {
          console.log('Message sent successfully', response);
          this.formData = {
            name: '',
            email: '',
            phone: '',
            inquiryType: '',
            message: ''
          };
        },
        error: (error) => {
          console.error('Error sending message', error);
        }
      });
  }
} 