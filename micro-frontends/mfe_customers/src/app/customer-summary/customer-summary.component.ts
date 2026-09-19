import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-customer-summary',
  standalone: true,
  imports: [CommonModule],
  template: `
    <section class="summary-container">
      <h2>Customers Summary</h2>
      <p>This is a simple second route inside the Customers MFE.</p>
      <ul>
        <li>Total customers: 54</li>
        <li>Active this month: 21</li>
        <li>New this week: 4</li>
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
export class CustomerSummaryComponent {}
