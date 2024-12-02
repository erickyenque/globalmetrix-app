import { Injectable } from '@angular/core';
import { Subject, Observable } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class ChannelService {

  private channelSubject: Subject<any> = new Subject<any>();
  
  constructor() { }
  sendDataToChannel(channelName: string, data: any): void {
    this.channelSubject.next({ channelName, data });
  }
  subscribeToChannel(channelName: string): Observable<any> {
    return new Observable(observer => {
      this.channelSubject.subscribe({
        next: (message) => {
          if (message.channelName === channelName) {
            observer.next(message.data);
          }
        },
        error: (err) => observer.error(err),
        complete: () => observer.complete(),
      });
    });
  }
}
