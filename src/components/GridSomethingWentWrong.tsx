import { Grid, Icon } from "@raycast/api";

export default function GridSomethingWentWrong() {
  return <Grid.EmptyView icon={Icon.Bug} title="Something went wrong :(" />;
}
