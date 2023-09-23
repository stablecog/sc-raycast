import { Form, ActionPanel, Action, Grid, showToast, Toast } from "@raycast/api";
import { useForm } from "@raycast/utils";
import { TGenerationCreateResult, TGenerationFormValues } from "@ts/types";
import { useState } from "react";
import fetch from "node-fetch";
import { aspectRatioToSize, defaultGridColumnsForImagine, modelNameToId } from "@ts/constants";
import { useToken } from "@hooks/useAuthorization";
import LoadingToken from "@components/LoadingToken";
import GalleryItemActions from "@components/GalleryItemActions";
import ErrorGrid from "@components/ErrorGrid";
import LoadingGrid from "@components/LoadingGrid";
import { formatPrompt } from "@ts/helpers";

export default function Command() {
  const { token, isTokenLoading } = useToken();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | undefined>(undefined);
  const [generationResult, setGenerationResult] = useState<TGenerationCreateResult | undefined>(undefined);
  const [numOutputs, setNumOutputs] = useState(2);
  const [cleanedPrompt, setCleanedPrompt] = useState("");
  const endpoint = "https://api.stablecog.com/v1/image/generation/create";
  const { handleSubmit } = useForm<TGenerationFormValues>({
    onSubmit: async (values) => {
      const { prompt, model, aspect_ratio, num_outputs } = values;
      const _cleanedPrompt = formatPrompt(prompt);
      setCleanedPrompt(_cleanedPrompt);
      if (!_cleanedPrompt) {
        await showToast({ title: "Please enter a prompt", style: Toast.Style.Failure });
        return;
      }
      const generationRequest = {
        prompt: _cleanedPrompt,
        model_id: modelNameToId[model],
        num_outputs: Number(num_outputs),
        width: aspectRatioToSize[aspect_ratio].width,
        height: aspectRatioToSize[aspect_ratio].height,
      };
      setNumOutputs(Number(num_outputs));
      setCleanedPrompt(_cleanedPrompt);
      setIsLoading(true);
      try {
        const res = await fetch(endpoint, {
          method: "POST",
          body: JSON.stringify(generationRequest),
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        const resJson = (await res.json()) as TGenerationCreateResult;
        setGenerationResult(resJson);
        setIsLoading(false);
      } catch (error) {
        setError("Something went wrong :(");
        setIsLoading(false);
        await showToast({ title: `Something went wrong :(`, style: Toast.Style.Failure });
      }
    },
  });

  if (isTokenLoading) return <LoadingToken />;
  if (error) return <ErrorGrid columns={defaultGridColumnsForImagine} />;
  if (isLoading) return <LoadingGrid columns={defaultGridColumnsForImagine} itemCount={numOutputs}></LoadingGrid>;

  if (generationResult)
    return (
      <Grid columns={defaultGridColumnsForImagine} onSearchTextChange={() => null}>
        {generationResult.outputs.map((output, i) => (
          <Grid.Item
            key={i}
            actions={
              <GalleryItemActions
                item={{
                  guidance_scale: generationResult.settings.guidance_scale,
                  height: generationResult.settings.height,
                  id: output.id,
                  image_url: output.url,
                  inference_steps: generationResult.settings.inference_steps,
                  model_id: generationResult.settings.model_id,
                  prompt_text: cleanedPrompt,
                  scheduler_id: generationResult.settings.scheduler_id,
                  width: generationResult.settings.width,
                }}
              ></GalleryItemActions>
            }
            content={{
              source: output.url,
            }}
          ></Grid.Item>
        ))}
      </Grid>
    );

  return <ImagineAdvancedForm handleSubmit={handleSubmit} />;
}

function ImagineAdvancedForm({ handleSubmit }: { handleSubmit: (values: TGenerationFormValues) => void }) {
  return (
    <Form
      actions={
        <ActionPanel>
          <Action.SubmitForm onSubmit={handleSubmit} title="Imagine" />
        </ActionPanel>
      }
    >
      <Form.TextArea placeholder="Portrait of a cat by van Gogh" title="Prompt" id="prompt" autoFocus />
      <Form.Dropdown title="Aspect Ratio" id="aspect_ratio" defaultValue="1:1">
        <Form.Dropdown.Item title="Square (1:1)" value="1:1" />
        <Form.Dropdown.Item title="Portrait (2:3)" value="2:3" />
        <Form.Dropdown.Item title="Landscape (3:2)" value="3:2" />
        <Form.Dropdown.Item title="Mobile (9:16)" value="9:16" />
        <Form.Dropdown.Item title="Desktop (16:9)" value="16:9" />
        <Form.Dropdown.Item title="Squarish (4:5)" value="4:5" />
      </Form.Dropdown>
      <Form.Dropdown title="Model" id="model" defaultValue="Kandinsky 2.2">
        <Form.Dropdown.Item title="Kandinsky 2.2" value="Kandinsky 2.2" />
        <Form.Dropdown.Item value="SDXL" title="SDXL" />
      </Form.Dropdown>
      <Form.Dropdown title="Number of Outputs" id="num_outputs" defaultValue="2">
        <Form.Dropdown.Item title="1" value="1" />
        <Form.Dropdown.Item title="2" value="2" />
        <Form.Dropdown.Item title="4" value="4" />
      </Form.Dropdown>
    </Form>
  );
}
