import { Component, OnInit } from '@angular/core';
import { BackendConnectionService } from '../../services/backend-connection.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-connection-status',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="connection-status" [ngClass]="{'connected': isConnected, 'disconnected': !isConnected}">
      <span *ngIf="isConnected">✅ Connected to backend</span>
      <span *ngIf="!isConnected">❌ Not connected to backend: {{errorMessage}}</span>
    </div>
  `,
  styles: [`
    .connection-status {
      padding: 10px;
      border-radius: 4px;
      margin: 10px 0;
      font-weight: bold;
    }
    .connected {
      background-color: #d4edda;
      color: #155724;
    }
    .disconnected {
      background-color: #f8d7da;
      color: #721c24;
    }
  `]
})
export class ConnectionStatusComponent implements OnInit {
  isConnected = false;
  errorMessage = '';

  constructor(private connectionService: BackendConnectionService) {}

  ngOnInit(): void {
    this.checkConnection();
  }

  checkConnection(): void {
    this.connectionService.checkConnection().subscribe(
      response => {
        this.isConnected = response.connected !== false;
        if (!this.isConnected) {
          this.errorMessage = response.error || 'Unknown error';
        }
      }
    );
  }
}