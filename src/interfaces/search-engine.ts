

export interface QueryResponse {
  items: Record<string, any>[]
  totalResults: number
}

export interface SearchEngineService {
  query(query: string): Promise<QueryResponse>;
}