import { Action, ActionPanel, Grid, Icon } from "@raycast/api";

const notEnoughCreditsString = "Not enough credits. Subscribe for more!";

export default function GridError({ error }: { error: string }) {
  return (
    <Grid
      actions={
        (error === "insufficient_credits" || error === notEnoughCreditsString) && (
          <ActionPanel>
            <Action.OpenInBrowser title="Subscribe at stablecog.com" url="https://stablecog.com/pricing" />
          </ActionPanel>
        )
      }
    >
      <Grid.EmptyView
        key="error"
        icon={error === "insufficient_credits" || error === notEnoughCreditsString ? Icon.Bolt : Icon.Bug}
        title={error === "insufficient_credits" ? notEnoughCreditsString : error}
      />
    </Grid>
  );
}
