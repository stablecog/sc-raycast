import { useFetch } from "@raycast/utils";
import { TGalleryPage } from "../types";

export default function useGallery<T>(search: string): {
  galleryPage: TGalleryPage | undefined;
  galleryPageError: Error | undefined;
  isLoadingGalleryPage: boolean;
} {
  const endpoint = "https://api.stablecog.com/v1/gallery";
  const per_page = 50;
  const score_threshold = 50;
  const url = new URL(endpoint);
  url.searchParams.append("per_page", per_page.toString());
  url.searchParams.append("score_threshold", score_threshold.toString());
  if (search) {
    url.searchParams.append("search", search);
  }
  const { data, error, isLoading } = useFetch<TGalleryPage>(url.toString(), {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });
  return { galleryPage: data, galleryPageError: error, isLoadingGalleryPage: isLoading };
}
