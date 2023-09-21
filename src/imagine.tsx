import { LaunchProps, Grid, Detail } from "@raycast/api";
import { useFetch } from "@raycast/utils";
import { TGenerationCreateResult } from "./types";
import { loadingGif } from "./constants";
import GridSomethingWentWrong from "./components/GridSomethingWentWrong";
import { useToken } from "@hooks/useAuthorization";
import LoadingToken from "@components/LoadingToken";

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

  if (isTokenLoading) return <LoadingToken />;

  return (
    <Grid isLoading={isLoading} columns={num_outputs} onSearchTextChange={() => null}>
      {error ? (
        <GridSomethingWentWrong />
      ) : (
        Array.from({ length: num_outputs }, (_, i) => (
          <Grid.Item
            key={i}
            content={{
              source: isLoading ? loadingGif : data?.outputs[i].url || loadingGif,
            }}
          ></Grid.Item>
        ))
      )}
    </Grid>
  );
}
