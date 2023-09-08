export interface TGenerationCreateResult {
  outputs: TOutput[];
  remaining_credits: number;
}

interface TOutput {
  id: string;
  url: string;
}
