import { NgModule, APP_INITIALIZER } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { routes } from './app.routes';
import { provideAnimations } from '@angular/platform-browser/animations';
import { provideRouter } from '@angular/router';
import { BackendConnectionService } from './services/backend-connection.service';

// Function to check backend connection during app initialization
export function checkBackendConnection(connectionService: BackendConnectionService) {
  return () => {
    return connectionService.checkConnection().toPromise();
  };
}

@NgModule({
  declarations: [
    // Remove AppComponent from declarations if it's standalone
    // AppComponent,
    // ... other components
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    // Import AppComponent if it's standalone
    AppComponent,
    // ... other modules
  ],
  providers: [
    provideRouter(routes),
    provideAnimations(),
    // Add this provider to check backend connection during initialization
    {
      provide: APP_INITIALIZER,
      useFactory: checkBackendConnection,
      deps: [BackendConnectionService],
      multi: true
    }
  ],
  // Remove bootstrap array since AppComponent is standalone
  bootstrap: []
})
export class AppModule { }