export interface TGenerationCreateResult {
  outputs: TGenerationCreationOutput[];
  remaining_credits: number;
}

interface TGenerationCreationOutput {
  id: string;
  url: string;
}

export interface TUpscaleCreateResult {
  outputs: TUpscaleCreationOutput[];
  remaining_credits: number;
}

interface TUpscaleCreationOutput {
  id: string;
  url: string;
}

export interface THistoryPage {
  total_count: number;
  outputs: TOutput[];
  next?: number;
}

export interface TOutput {
  id: string;
  image_url: string;
}

export interface TGalleryPage {
  next?: number;
  hits: TOutput[];
}

export interface TUpscaleFormValues {
  images: string[];
}
