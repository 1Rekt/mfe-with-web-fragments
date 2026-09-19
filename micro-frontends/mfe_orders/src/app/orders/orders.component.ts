import { Component, CUSTOM_ELEMENTS_SCHEMA, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-orders',
  standalone: true,
  imports: [CommonModule],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  templateUrl: './orders.component.html',
  styleUrl: './orders.component.css'
})
export class OrdersComponent implements OnInit {
  orders: any[] = [];

  ngOnInit(): void {
    this.loadOrders();
  }

  private loadOrders(): void {
    const dataUrls = [
      '/assets/data/orders.json'
    ];

    this.fetchFirstAvailable(dataUrls)
      .then(res => res.json())
      .then(data => {
        this.orders = data;
      })
      .catch(err => console.error('Failed to load orders:', err));
  }

  private async fetchFirstAvailable(urls: string[]): Promise<Response> {
    for (const url of urls) {
      const response = await fetch(url);
      if (response.ok) {
        return response;
      }
    }

    throw new Error('Orders data file not found in any configured location');
  }
}
