import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-order-summary',
  standalone: true,
  imports: [CommonModule],
  template: `
    <section class="summary-container">
      <h2>Orders Summary</h2>
      <p>This is a simple second route inside the Orders MFE.</p>
      <ul>
        <li>Total orders: 128</li>
        <li>Open orders: 17</li>
        <li>Completed today: 9</li>
      </ul>
    </section>
  `,
  styles: [
    `
      .summary-container {
        padding: 16px;
        border: 1px solid #d8dee9;
        border-radius: 8px;
        background: #f8fafc;
      }

      h2 {
        margin-top: 0;
      }
    `
  ]
})
export class OrderSummaryComponent {}
