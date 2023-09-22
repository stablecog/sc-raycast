import { LaunchProps, Grid } from "@raycast/api";
import { useFetch } from "@raycast/utils";
import { TGenerationCreateResult } from "@ts/types";
import { loadingGif } from "@ts/constants";
import GridSomethingWentWrong from "@components/GridSomethingWentWrong";
import { useToken } from "@hooks/useAuthorization";
import LoadingToken from "@components/LoadingToken";
import GalleryItemActions from "@components/GalleryItemActions";

export default function Command(props: LaunchProps<{ arguments: Arguments.Imagine }>) {
  const { Prompt } = props.arguments;
  const endpoint = "https://api.stablecog.com/v1/image/generation/create";
  const num_outputs = 2;
  const generationParams = {
    prompt: Prompt,
    num_outputs,
  };
  const { token, isTokenLoading } = useToken();
  const { data, isLoading, error } = useFetch<TGenerationCreateResult>(endpoint, {
    method: "POST",
    body: JSON.stringify(generationParams),
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });

  if (data) console.log(data);

  if (isTokenLoading) return <LoadingToken />;

  return (
    <Grid isLoading={isLoading} columns={num_outputs} onSearchTextChange={() => null}>
      {error ? (
        <GridSomethingWentWrong />
      ) : (
        Array.from({ length: num_outputs }, (_, i) => (
          <Grid.Item
            key={i}
            actions={
              data?.outputs[i] && (
                <GalleryItemActions
                  item={{
                    guidance_scale: data.settings.guidance_scale,
                    height: data.settings.height,
                    id: data.outputs[i].id,
                    image_url: data.outputs[i].url,
                    inference_steps: data.settings.inference_steps,
                    model_id: data.settings.model_id,
                    prompt_text: Prompt,
                    scheduler_id: data.settings.scheduler_id,
                    width: data.settings.width,
                  }}
                ></GalleryItemActions>
              )
            }
            content={{
              source: isLoading ? loadingGif : data?.outputs[i].url || loadingGif,
            }}
          ></Grid.Item>
        ))
      )}
    </Grid>
  );
}
