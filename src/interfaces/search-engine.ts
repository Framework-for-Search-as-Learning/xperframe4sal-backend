

export interface QueryResponse {
  items: Record<string, any>[]
  totalResults: number
}

export interface SearchEngineService {
  query(
    query: string,
    startIndex: number,
    resultsPerPage: number,
    experimentId: string,
  ): Promise<QueryResponse>;
}