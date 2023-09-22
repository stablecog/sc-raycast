import { useState } from "react";
import useGallery from "@hooks/useGallery";
import GridSearchingPlaceholder from "@components/GridSearchingPlaceholder";
import GridNoItemsPlaceholder from "@components/GridNoItemsPlaceholder";
import GridSomethingWentWrong from "@components/GridSomethingWentWrong";
import GalleryItemActions from "@components/GalleryItemActions";
import { getThumbnailImgUrl } from "@ts/helpers";
import { defaultGridColumns } from "@ts/constants";
import { Grid } from "@raycast/api";

export default function Command() {
  const [query, setQuery] = useState("");
  const { galleryPage, isLoadingGalleryPage, galleryPageError } = useGallery(query);
  return (
    <Grid
      searchBarPlaceholder="Search gallery..."
      onSearchTextChange={setQuery}
      isLoading={isLoadingGalleryPage}
      columns={defaultGridColumns}
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
            actions={<GalleryItemActions item={hit} />}
            content={{
              source: getThumbnailImgUrl(hit.image_url, defaultGridColumns),
            }}
          ></Grid.Item>
        ))
      )}
    </Grid>
  );
}
