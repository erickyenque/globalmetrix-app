import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage-angular';

@Injectable({
  providedIn: 'root'
})
export class StorageService {

  private _storage: Storage | null = null;

  constructor(private storage: Storage) { }

  async init() {
    const storage = await this.storage.create();
    this._storage = storage;
  }

  async setItem(key: string, value: any) {
    if(!this._storage) await this.init();
    return await this._storage?.set(key, value);
  }

  async getItem(key: string) {
    if(!this._storage) await this.init();
    return await this._storage?.get(key);
  }

  async removeItem(key: string) {
    if(!this._storage) await this.init();
    return await this._storage?.remove(key);
  }
}
