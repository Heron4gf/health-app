import { Component, ElementRef, ViewChild, AfterViewInit, OnDestroy, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-farmaco-check',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './farmaco-check.component.html',
  styleUrl: './farmaco-check.component.css'
})
export class FarmacoCheckComponent implements AfterViewInit, OnDestroy {
  @ViewChild('videoEl') videoEl!: ElementRef<HTMLVideoElement>;

  @Output() scanned = new EventEmitter<void>();
  @Output() closed = new EventEmitter<void>();

  stream: MediaStream | null = null;
  cameraError = false;
  scanComplete = false;
  private scanTimeout: any;

  ngAfterViewInit(): void {
    this.startCamera();
  }

  ngOnDestroy(): void {
    this.stopCamera();
    if (this.scanTimeout) {
      clearTimeout(this.scanTimeout);
    }
  }

  async startCamera(): Promise<void> {
    try {
      this.stream = await navigator.mediaDevices.getUserMedia({
        video: { facingMode: 'environment' }
      });
      const video = this.videoEl?.nativeElement;
      if (video) {
        video.srcObject = this.stream;
      }
      // Auto-scan after 3 seconds
      this.scanTimeout = setTimeout(() => this.onAutoScan(), 3000);
    } catch (err) {
      this.cameraError = true;
    }
  }

  stopCamera(): void {
    if (this.stream) {
      this.stream.getTracks().forEach(track => track.stop());
      this.stream = null;
    }
  }

  onAutoScan(): void {
    this.scanComplete = true;
    this.stopCamera();
    // Flash green for 400ms then close and emit scanned
    setTimeout(() => {
      this.scanComplete = false;
      this.scanned.emit();
      this.closed.emit();
    }, 400);
  }

  close(): void {
    this.stopCamera();
    if (this.scanTimeout) {
      clearTimeout(this.scanTimeout);
    }
    this.closed.emit();
  }
}