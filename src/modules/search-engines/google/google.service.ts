import { Injectable } from '@nestjs/common';
import { QueryResponse, SearchEngineService } from 'src/interfaces/search-engine';
import { HttpService } from 'src/modules/http/http.service';
import { GOOGLE } from './google-constants';
import { SearchResultDto } from '../search-result.dto';
import { CanceledError } from 'axios';


const checkXFrameOptions = async (url: string, httpService: HttpService, maxAttemps: number = 2, sleep: number = 100, timeout = 2000) => {
  let attempt = 0;

  while (attempt < maxAttemps) {
    const abortController = new AbortController();
    const timeoutId = setTimeout(() => abortController.abort(), timeout);
    try {
      const response = await httpService.head(url, { signal: abortController.signal });
      const xFrameOptions = response.headers['x-frame-options'] as string || null;
      if (!xFrameOptions) {
        return true;
      }

      return !xFrameOptions.toLowerCase().includes('sameorigin')
        && !xFrameOptions.toLowerCase().includes('deny') && !xFrameOptions.toLowerCase().includes('allow-from');
    } catch (error: any) {
      if (error instanceof CanceledError) {
        return false;
      }

      await new Promise(resolve => setTimeout(resolve, sleep));
      attempt++;
    } finally {
      clearTimeout(timeoutId);
    }
  }

  return false;
}

const MAX_RESULTS = 100;
const MAX_START_INDEX = 91;

@Injectable()
export class GoogleService implements SearchEngineService {
  constructor(
    private readonly httpService: HttpService,
  ) { }

  async query(
    query: string,
    startIndex: number = 1,
    resultsPerPage: number = 10
  ): Promise<QueryResponse> {
    try {
      return this.queryInternal(query, startIndex, resultsPerPage);
    } catch (error) {
      throw error;
    }
  }
  private async queryInternal(
    query: string,
    startIndex: number = 1,
    resultsPerPage: number = 10
  ): Promise<QueryResponse> {

    try {
      startIndex = Math.min(startIndex, MAX_START_INDEX);
      const url = `${GOOGLE.URL_BASE}?q=${query}&key=${process.env.GOOGLE_API_KEY}&cx=${process.env.GOOGLE_CX}&num=${resultsPerPage}&start=${startIndex}&hl=pt-BR&gl=br&safe=active`;
      const response = await this.httpService.get<SearchResultDto>(url);
      const results = response?.data;

      const items = results.items;

      items.forEach((item, index) => {
        item = Object.assign(item, { rank: index + startIndex });
      });

      const totalResults = Math.min(Number(results?.searchInformation?.totalResults), MAX_RESULTS);

      return {
        items: items.slice(0, resultsPerPage),
        totalResults: totalResults,
        googlePagesAccessed: 1
      } as QueryResponse;
    } catch (error) {
      console.error(error)
      throw new Error(error.message);
    }
  }
}
