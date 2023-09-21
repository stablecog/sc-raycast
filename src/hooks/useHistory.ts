import { useFetch } from "@raycast/utils";
import { THistoryPage } from "../types";

export default function useHistory<T>({ search, token }: { search: string; token: string | undefined }): {
  historyPage: THistoryPage | undefined;
  historyPageError: Error | undefined;
  isLoadingHistoryPage: boolean;
} {
  const endpoint = "https://api.stablecog.com/v1/image/generation/outputs";
  const per_page = 50;
  const score_threshold = 50;
  const url = new URL(endpoint);

  url.searchParams.append("score_threshold", score_threshold.toString());
  url.searchParams.append("per_page", per_page.toString());
  if (search) {
    url.searchParams.append("search", search);
  }
  const { data, error, isLoading } = useFetch<THistoryPage>(url.toString(), {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });
  if (!token) {
    return { historyPage: undefined, historyPageError: undefined, isLoadingHistoryPage: true };
  }
  return { historyPage: data, historyPageError: error, isLoadingHistoryPage: isLoading };
}
