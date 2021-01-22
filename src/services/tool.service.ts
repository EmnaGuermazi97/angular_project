import { Injectable } from '@angular/core';
import {GLOBAL} from '../app/app-config';
import {Tool} from '../models/tool.model';
import {HttpClient} from '@angular/common/http';
import {environment} from '../environments/environment';
import {Publication} from '../models/publication.model';

@Injectable({
  providedIn: 'root'
})
export class ToolService {

  private path = `${environment.gatewayEndpoint}/outil-service`;
  public placeholderTools: Tool[] = GLOBAL._DB.tools;
  constructor(
    private httpClient: HttpClient,

  ) { }
  getAllTools(): Promise<Tool[]> {
    return this.httpClient.get<Tool[]>(`${this.path}/tools`).toPromise();

  }

  getToolById(id: string): Promise<Tool> {
    return this.httpClient.get<Tool>(`${this.path}/tools/${id}`).toPromise();
  }
  getToolBySource(source: string): Promise<Tool> {
    return this.httpClient.get<Tool>(`${this.path}/tools/find/${source}`).toPromise();
  }

  /**
   * create a new tool or update an old tool.
   * a new tool doesn't have an id
   */
  saveTool(tool: any): Promise<Tool> {
    if (!!tool.id) {
      return this.updateTool(tool.id, tool);
    } else {
      return this.createTool(tool);
    }
  }

  createTool(tool: any): Promise<Tool> {
    return this.httpClient.post<Tool>(`${this.path}/tools/add`, tool).toPromise();
  }

  updateTool(id: string, tool: any): Promise<Tool> {
    return this.httpClient.put<Tool>(`${this.path}/tools/update/${id}`, tool).toPromise();
  }
  removeToolById(id: string): Promise<void> {
    return this.httpClient.delete<void>(`${this.path}/tools/delete/${id}`).toPromise();
    // this.placeholderTools = this.placeholderTools.filter(item => item.id !== id);
    // return new Promise(resolve => resolve());
  }

}
