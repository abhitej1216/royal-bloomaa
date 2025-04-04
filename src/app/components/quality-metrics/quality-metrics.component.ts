import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { trigger, transition, style, animate } from '@angular/animations';

@Component({
  selector: 'app-quality-metrics',
  standalone: true,
  imports: [CommonModule],
  template: `
    <section class="quality-metrics">
      <div class="container">
        <div class="section-header text-center">
          <h2>Premium Fragrances at Affordable Prices</h2>
          <p class="subtitle">
            At Royal Bloomaa, we believe that luxury fragrances should be accessible to everyone. Our attars 
            are crafted with the same high-quality ingredients as designer brands, but without the markup. 
            Experience the difference today.
          </p>
        </div>

        <div class="metrics-container">
          <div class="row">
            <div class="col-md-3 col-sm-6" *ngFor="let metric of metrics">
              <div class="metric-card" [@fadeInUp]>
                <div class="metric-value">{{metric.value}}</div>
                <div class="metric-label">{{metric.label}}</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  `,
  styles: [`
    .quality-metrics {
      padding: 80px 0;
      background-color: #f8f9fa;
    }

    .section-header {
      margin-bottom: 60px;
    }

    .section-header h2 {
      font-size: 2.5rem;
      font-weight: 700;
      margin-bottom: 20px;
      color: #333;
    }

    .subtitle {
      font-size: 1.1rem;
      color: #666;
      max-width: 800px;
      margin: 0 auto;
      line-height: 1.6;
    }

    .metrics-container {
      padding: 20px 0;
    }

    .metric-card {
      text-align: center;
      padding: 30px 20px;
      transition: transform 0.3s ease;
    }

    .metric-card:hover {
      transform: translateY(-10px);
    }

    .metric-value {
      font-size: 3.5rem;
      font-weight: 700;
      color: #8a2be2;
      margin-bottom: 15px;
      background: linear-gradient(45deg, #8a2be2, #4a90e2);
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
    }

    .metric-label {
      font-size: 1.1rem;
      color: #444;
      font-weight: 500;
    }

    @media (max-width: 768px) {
      .section-header h2 {
        font-size: 2rem;
      }

      .metric-card {
        margin-bottom: 30px;
      }

      .metric-value {
        font-size: 3rem;
      }
    }
  `],
  animations: [
    trigger('fadeInUp', [
      transition(':enter', [
        style({ opacity: 0, transform: 'translateY(20px)' }),
        animate('600ms ease-out', style({ opacity: 1, transform: 'translateY(0)' }))
      ])
    ])
  ]
})
export class QualityMetricsComponent {
  metrics = [
    {
      value: '100%',
      label: 'Cruelty-Free'
    },
    {
      value: '95%',
      label: 'Natural Ingredients'
    },
    {
      value: '8+',
      label: 'Hours Lasting'
    },
    {
      value: '30+',
      label: 'Unique Scents'
    }
  ];
} 