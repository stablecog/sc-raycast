import { Grid } from "@raycast/api";
import { useState } from "react";
import useHistory from "./hooks/useHistory";
import GridSearchingPlaceholder from "./components/GridSearchingPlaceholder";
import GridNoItemsPlaceholder from "./components/GridNoItemsPlaceholder";
import GridSomethingWentWrong from "./components/GridSomethingWentWrong";
import { useToken } from "@hooks/useAuthorization";
import LoadingToken from "@components/LoadingToken";

export default function Command() {
  const [query, setQuery] = useState("");
  const { token, isTokenLoading } = useToken();
  const { historyPage, isLoadingHistoryPage, historyPageError } = useHistory({ search: query, token: token });

  if (isTokenLoading) return <LoadingToken />;

  return (
    <Grid
      searchBarPlaceholder="Search your Stablecog history"
      onSearchTextChange={setQuery}
      isLoading={isLoadingHistoryPage}
      columns={4}
      throttle={true}
    >
      {historyPageError ? (
        <GridSomethingWentWrong />
      ) : historyPage === undefined ? (
        <GridSearchingPlaceholder />
      ) : historyPage.outputs.length === 0 ? (
        <GridNoItemsPlaceholder />
      ) : (
        historyPage?.outputs?.map((output) => (
          <Grid.Item
            key={output.id}
            content={{
              source: output.image_url,
            }}
          ></Grid.Item>
        ))
      )}
    </Grid>
  );
}
