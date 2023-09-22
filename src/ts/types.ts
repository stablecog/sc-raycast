export interface TGenerationCreateResult {
  outputs: TGenerationCreationOutput[];
  remaining_credits: number;
  settings: {
    model_id: string;
    scheduler_id: string;
    width: number;
    height: number;
    guidance_scale: number;
    inference_steps: number;
    seed: number;
  };
}

export interface TGenerationCreationOutput {
  id: string;
  url: string;
}

export interface TUpscaleCreateResult {
  outputs: TUpscaleCreationOutput[];
  remaining_credits: number;
}

export interface TUpscaleCreationOutput {
  id: string;
  url: string;
}

export interface TGalleryPage {
  next?: number;
  hits: TOutput[];
}

export interface THistoryPage {
  next?: number;
  outputs: TOutputHistory[];
}

export interface TOutput {
  id: string;
  image_url: string;
  upscaled_image_url?: string;
  prompt_text: string;
  width: number;
  height: number;
  guidance_scale: number;
  inference_steps: number;
  model_id: string;
  scheduler_id: string;
}

export interface TOutputHistory {
  id: string;
  image_url: string;
  upscaled_image_url: string;
  generation: {
    prompt: {
      text: string;
    };
    width: number;
    height: number;
    guidance_scale: number;
    inference_steps: number;
    model_id: string;
    scheduler_id: string;
  };
}

export interface TUpscaleFormValues {
  images: string[];
}
