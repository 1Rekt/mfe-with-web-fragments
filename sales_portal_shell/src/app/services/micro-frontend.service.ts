import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, BehaviorSubject } from 'rxjs';
import { tap } from 'rxjs/operators';
import { firstValueFrom } from 'rxjs';

export interface MicroFrontendConfig {
  id: string;
  name: string;
  path: string;
  url: string;
  fragmentId: string;
}

@Injectable({
  providedIn: 'root'
})
export class MicroFrontendService {
  private mfeConfigSubject = new BehaviorSubject<MicroFrontendConfig[]>([]);
  private configError: string | null = null;
  public mfeConfig$ = this.mfeConfigSubject.asObservable();

  constructor(private http: HttpClient) {}

  loadMicroFrontendConfig(): Observable<MicroFrontendConfig[]> {
    return this.http.get<MicroFrontendConfig[]>('/assets/mfe-config.json').pipe(
      tap(config => this.mfeConfigSubject.next(config))
    );
  }

  async preloadMicroFrontendConfig(): Promise<void> {
    try {
      this.configError = null;
      await firstValueFrom(this.loadMicroFrontendConfig());
    } catch {
      this.configError = 'Failed to load micro-frontend configuration';
      this.mfeConfigSubject.next([]);
    }
  }

  getMicroFrontends(): MicroFrontendConfig[] {
    return this.mfeConfigSubject.value;
  }

  getConfigError(): string | null {
    return this.configError;
  }
}
