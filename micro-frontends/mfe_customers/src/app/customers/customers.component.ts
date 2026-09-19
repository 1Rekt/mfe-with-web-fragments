import { Component, CUSTOM_ELEMENTS_SCHEMA, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-customers',
  standalone: true,
  imports: [CommonModule],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  templateUrl: './customers.component.html',
  styleUrl: './customers.component.css'
})
export class CustomersComponent implements OnInit {
  customers: any[] = [];

  ngOnInit(): void {
    this.loadCustomers();
  }

  private loadCustomers(): void {
    const dataUrls = [
      '/assets/data/customers.json'
    ];

    this.fetchFirstAvailable(dataUrls)
      .then(res => res.json())
      .then(data => {
        this.customers = data;
      })
      .catch(err => console.error('Failed to load customers:', err));
  }

  private async fetchFirstAvailable(urls: string[]): Promise<Response> {
    for (const url of urls) {
      const response = await fetch(url);
      if (response.ok) {
        return response;
      }
    }

    throw new Error('Customers data file not found in any configured location');
  }
}
