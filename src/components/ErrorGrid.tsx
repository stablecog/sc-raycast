import GridSomethingWentWrong from "@components/GridSomethingWentWrong";
import { Grid } from "@raycast/api";

export default function ErrorGrid({ columns }: { columns: number }) {
  return (
    <Grid columns={columns} onSearchTextChange={() => null}>
      <GridSomethingWentWrong />
    </Grid>
  );
}
