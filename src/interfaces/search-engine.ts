/*
 * Copyright (c) 2026, marcelomachado
 * Licensed under The MIT License [see LICENSE for details]
 */


export interface QueryResponse {
  items: Record<string, any>[]
  totalResults: number
}

export interface SearchEngineService {
  query(query: string): Promise<QueryResponse>;
}