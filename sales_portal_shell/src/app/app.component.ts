import {
  Component,
  OnInit,
  AfterViewInit,
  CUSTOM_ELEMENTS_SCHEMA,
  ElementRef,
  ViewChild,
  ViewEncapsulation,
} from '@angular/core';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import { PLATFORM_ID, inject } from '@angular/core';

interface ShellTemplate {
  id: string;
  name: string;
  file: string;
}

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  encapsulation: ViewEncapsulation.None,
})
export class AppComponent implements OnInit, AfterViewInit {
  private readonly platformId = inject(PLATFORM_ID);
  private viewInitialized = false;
  private pendingTemplateHtml: string | null = null;

  @ViewChild('templateHost')
  set templateHostRef(ref: ElementRef<HTMLElement> | undefined) {
    this.templateHost = ref ?? null;
    this.renderTemplateIfReady();
  }

  private templateHost: ElementRef<HTMLElement> | null = null;

  title = 'Sales Portal Shell';
  templates: ShellTemplate[] = [];
  selectedTemplateId: string | null = null;
  isBrowser = false;
  isLoading = true;
  error: string | null = null;

  constructor() {}

  ngOnInit(): void {
    this.isBrowser = isPlatformBrowser(this.platformId);
    if (!this.isBrowser) {
      this.isLoading = false;
      return;
    }

    void this.loadTemplateManifest();
  }

  ngAfterViewInit(): void {
    this.viewInitialized = true;
    this.renderTemplateIfReady();
  }

  onTemplateSelectionChange(event: Event): void {
    const templateId = (event.target as HTMLSelectElement).value;
    if (!templateId) {
      return;
    }

    void this.selectTemplate(templateId);
  }

  private async loadTemplateManifest(): Promise<void> {
    try {
      this.error = null;
      const response = await fetch('/assets/templates/template-manifest.json');

      if (!response.ok) {
        throw new Error(`Template manifest request failed (${response.status})`);
      }

      const templates = (await response.json()) as ShellTemplate[];
      this.templates = templates;

      if (!this.templates.length) {
        throw new Error('No templates were found in template-manifest.json');
      }

      await this.selectTemplate(this.templates[0].id);
    } catch {
      this.error = 'Failed to load shell templates';
    } finally {
      this.isLoading = false;
    }
  }

  private async selectTemplate(templateId: string): Promise<void> {
    const selectedTemplate = this.templates.find((template) => template.id === templateId);
    if (!selectedTemplate) {
      return;
    }

    try {
      this.error = null;
      this.selectedTemplateId = selectedTemplate.id;

      const response = await fetch(`/assets/templates/${selectedTemplate.file}`);
      if (!response.ok) {
        throw new Error(`Template request failed (${response.status})`);
      }

      this.pendingTemplateHtml = await response.text();
      this.renderTemplateIfReady();
    } catch {
      this.error = 'Failed to load selected template';
    }
  }

  private renderTemplateIfReady(): void {
    if (!this.isBrowser || !this.viewInitialized || !this.templateHost || this.pendingTemplateHtml === null) {
      return;
    }

    const host = this.templateHost.nativeElement;
    host.innerHTML = this.pendingTemplateHtml;
    this.mountTemplateFragments(host);
  }

  private mountTemplateFragments(host: HTMLElement): void {
    const placeholders = host.querySelectorAll<HTMLElement>('[data-fragment-id]');

    placeholders.forEach((placeholder) => {
      const fragmentId = placeholder.dataset['fragmentId'];
      if (!fragmentId) {
        return;
      }

      const src = placeholder.dataset['fragmentSrc'] || '/';
      const webFragment = document.createElement('web-fragment');
      webFragment.setAttribute('fragment-id', fragmentId);
      webFragment.setAttribute('src', src);
      placeholder.replaceWith(webFragment);
    });
  }
}

