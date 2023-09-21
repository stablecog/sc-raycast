import { Form, ActionPanel, Action, Grid, showToast, Toast } from "@raycast/api";
import { useForm } from "@raycast/utils";
import { TUpscaleCreateResult, TUpscaleFormValues } from "@ts/types";
import { useState } from "react";
import { readFile } from "fs/promises";
import fetch from "node-fetch";
import { FormData, File } from "formdata-node";
import { loadingGif } from "@ts/constants";
import imageSizeOf from "image-size";
import { useToken } from "@hooks/useAuthorization";
import LoadingToken from "@components/LoadingToken";

const allowedExtensions = ["png", "jpg", "jpeg", "webp"];
const maxWidth = 1024;
const maxHeight = 1024;

export default function Command() {
  const { token, isTokenLoading } = useToken();
  const [isLoading, setIsLoading] = useState(false);
  const [upscaledImageUrl, setUpscaledImageUrl] = useState<string | undefined>(undefined);
  const endpoint = "https://api.stablecog.com/v1/image/upscale/create";
  const { handleSubmit } = useForm<TUpscaleFormValues>({
    onSubmit: async (values) => {
      const imagePath = values.images[0];
      if (imagePath === undefined) {
        await showToast({ title: "Please select an image", style: Toast.Style.Failure });
        return;
      }
      const buffer = await readFile(imagePath);
      const imageName = imagePath.split("/").pop();
      if (imageName === undefined) {
        await showToast({ title: "Please select a valid image", style: Toast.Style.Failure });
        return;
      }
      const extension = imageName.split(".").pop();
      if (extension === undefined || !allowedExtensions.includes(extension)) {
        await showToast({ title: `Only PNG, JPEG, and WEBP is allowed`, style: Toast.Style.Failure });
        return;
      }
      const imageSize = imageSizeOf(buffer);
      if (!imageSize.width || !imageSize.height || imageSize.width > maxWidth || imageSize.height > maxHeight) {
        await showToast({
          title: `Image must be smaller than ${maxWidth + 1} × ${maxHeight + 1}`,
          style: Toast.Style.Failure,
        });
        return;
      }

      const form = new FormData();
      const file = new File([buffer], imageName);
      form.append("file", file);
      setIsLoading(true);
      try {
        const res = await fetch(endpoint, {
          method: "POST",
          body: form,
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        const resJson = (await res.json()) as TUpscaleCreateResult;
        const url = resJson.outputs[0].url;
        if (!url) throw new Error("No url found!");
        setUpscaledImageUrl(resJson.outputs[0].url);
      } catch (error) {
        await showToast({ title: `Something went wrong :(`, style: Toast.Style.Failure });
      } finally {
        setIsLoading(false);
      }
    },
  });

  if (isTokenLoading) return <LoadingToken />;

  return isLoading || upscaledImageUrl ? (
    <Grid isLoading={isLoading} columns={2} onSearchTextChange={() => null}>
      <Grid.Item
        key={"upscaled-image"}
        content={{
          source: isLoading ? loadingGif : upscaledImageUrl || loadingGif,
        }}
      ></Grid.Item>
    </Grid>
  ) : (
    <Form
      actions={
        <ActionPanel>
          <Action.SubmitForm onSubmit={handleSubmit} title="Upscale Image" />
        </ActionPanel>
      }
    >
      <Form.FilePicker title="Image" autoFocus allowMultipleSelection={false} id="images"></Form.FilePicker>
    </Form>
  );
}
