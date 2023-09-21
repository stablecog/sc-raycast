import { Grid } from "@raycast/api";
import { useState } from "react";
import useGallery from "@hooks/useGallery";
import GridSearchingPlaceholder from "@components/GridSearchingPlaceholder";
import GridNoItemsPlaceholder from "@components/GridNoItemsPlaceholder";
import GridSomethingWentWrong from "@components/GridSomethingWentWrong";

export default function Command() {
  const [query, setQuery] = useState("");
  const { galleryPage, isLoadingGalleryPage, galleryPageError } = useGallery(query);

  return (
    <Grid
      searchBarPlaceholder="Search the Stablecog gallery"
      onSearchTextChange={setQuery}
      isLoading={isLoadingGalleryPage}
      columns={4}
      throttle={true}
    >
      {galleryPageError ? (
        <GridSomethingWentWrong />
      ) : galleryPage === undefined ? (
        <GridSearchingPlaceholder />
      ) : galleryPage.hits.length === 0 ? (
        <GridNoItemsPlaceholder />
      ) : (
        galleryPage?.hits?.map((hit) => (
          <Grid.Item
            key={hit.id}
            content={{
              source: hit.image_url,
            }}
          ></Grid.Item>
        ))
      )}
    </Grid>
  );
}
