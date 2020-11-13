export interface DocItem {
  path: string;
  description?: string[];
  note?: string[];
  attributes?: Map<string, string[]>;
}
