import { Grid, Icon } from "@raycast/api";

export default function GridSomethingWentWrong() {
  return <Grid.EmptyView key="error" icon={Icon.Bug} title="Something went wrong :(" />;
}
