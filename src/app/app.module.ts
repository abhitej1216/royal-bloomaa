import { bootstrapApplication } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';
import { AppComponent } from './app.component';
import { HeaderComponent } from './components/header/header.component';
import { FooterComponent } from './components/footer/footer.component';
import { AppRoutingModule } from './app-routing.module';

bootstrapApplication(AppComponent, {
  providers: [
    RouterModule,
    AppRoutingModule,
    HeaderComponent,
    FooterComponent
  ]
}); 