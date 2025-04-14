import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';

@Component({
  selector: 'app-test',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="test-container">
      <h2>Backend Integration Test</h2>
      <button (click)="testConnection()">Test Connection</button>
      <div *ngIf="response" class="response">
        <h3>Response:</h3>
        <pre>{{ response | json }}</pre>
      </div>
      <div *ngIf="error" class="error">
        <h3>Error:</h3>
        <p>{{ error }}</p>
      </div>
    </div>
  `,
  styles: [`
    .test-container {
      padding: 20px;
      text-align: center;
    }
    button {
      padding: 10px 20px;
      font-size: 16px;
      cursor: pointer;
    }
    .response, .error {
      margin-top: 20px;
      padding: 10px;
      border-radius: 5px;
    }
    .response {
      background-color: #e8f5e9;
    }
    .error {
      background-color: #ffebee;
    }
  `]
})
export class TestComponent implements OnInit {
  response: any;
  error: string = '';

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    // Initialization logic can go here
  }

  testConnection() {
    this.http.get(`${environment.apiUrl}/api/test`).subscribe({
      next: (data) => {
        this.response = data;
        this.error = '';
      },
      error: (err) => {
        this.error = err.message;
        this.response = null;
      }
    });
  }
}