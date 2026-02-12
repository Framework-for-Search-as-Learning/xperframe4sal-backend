/*
 * Copyright (c) 2026, lapic-ufjf
 * Licensed under The MIT License [see LICENSE for details]
 */


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