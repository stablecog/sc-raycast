import { LaunchProps, Grid } from "@raycast/api";
import { useFetch } from "@raycast/utils";
import { TGenerationCreateResult } from "./types";

export default function Command(props: LaunchProps<{ arguments: Arguments.Imagine }>) {
  const { Prompt } = props.arguments;
  const endpoint = "https://api.stablecog.com/v1/image/generation/create";
  const num_outputs = 2;
  const generationParams = {
    prompt: Prompt,
    num_outputs,
  };
  const apiKey = "sc-70317b49e88d02956662c5d6e9a8f6ea8afa6a66e3a4676b6348716a6744ccd6";
  const { data, isLoading } = useFetch<TGenerationCreateResult>(endpoint, {
    method: "POST",
    body: JSON.stringify(generationParams),
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${apiKey}`,
    },
  });

  return (
    <Grid isLoading={isLoading} columns={num_outputs}>
      {Array.from({ length: num_outputs }, (_, i) => (
        <Grid.Item
          key={i}
          content={{
            source: isLoading
              ? "../assets/generation-loading.svg"
              : data?.outputs[i].url || "../assets/generation-loading.svg",
          }}
        ></Grid.Item>
      ))}
    </Grid>
  );
}
