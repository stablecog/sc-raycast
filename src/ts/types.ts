import { TAspectRatio, TModelId, TModelName, TNumOutputs, TSchedulerId } from "@ts/constants";

export interface TGenerationCreateResult {
  outputs: TGenerationCreationOutput[];
  remaining_credits: number;
  settings: {
    model_id: TModelId;
    scheduler_id: TSchedulerId;
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
  model_id: TModelId;
  scheduler_id: TSchedulerId;
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
    model_id: TModelId;
    scheduler_id: TSchedulerId;
  };
}

export interface TUpscaleFormValues {
  images: string[];
}

export interface TGenerationFormValues {
  prompt: string;
  model: TModelName;
  aspect_ratio: TAspectRatio;
  num_outputs: TNumOutputs;
}
