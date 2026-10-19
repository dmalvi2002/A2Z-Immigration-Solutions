import { Card, Stack, Text } from "@sanity/ui";
import { useFormValue, type ObjectInputProps } from "sanity";
import { siteUrl } from "../lib/seo";
import { pageRegistry } from "../pageRegistry";

export function SeoInput(props: ObjectInputProps) {
  const title = useFormValue(["title"]) as string | undefined;
  const slug = useFormValue(["slug", "current"]) as string | undefined;
  const path = useFormValue(["path"]) as string | undefined;
  const type = useFormValue(["_type"]) as string | undefined;
  const documentId = useFormValue(["_id"]) as string | undefined;
  const definition =
    type === "page"
      ? pageRegistry.find(
          (page) => `page-${page.id}` === documentId?.replace(/^drafts\./, ""),
        )
      : undefined;
  const value = props.value as
    | { title?: string; description?: string }
    | undefined;
  const previewPath =
    path ||
    definition?.path ||
    (slug
      ? `/blog/${type === "category" ? "category/" : ""}${slug}`
      : "/blog/category/show-all");
  return (
    <Stack space={4}>
      <Card padding={4} radius={2} border tone="transparent">
        <Stack space={3}>
          <Text size={1} weight="semibold">
            Search appearance preview (illustrative)
          </Text>
          <Text size={1}>
            {siteUrl}
            {previewPath}
          </Text>
          <Text size={2} weight="semibold">
            {value?.title || definition?.title || title || "Your page title"}
          </Text>
          <Text size={1}>
            {value?.description ||
              definition?.description ||
              "Add a meta description below. Without one, the website uses its content fallback."}
          </Text>
          {definition && (
            <Text size={1}>
              These fields are optional. When you leave them blank, the website
              uses the default title and description shown above. Publish to
              apply any changes you enter.
            </Text>
          )}
          <Text size={1}>
            SEO title: {value?.title?.length || 0} characters · Description:{" "}
            {value?.description?.length || 0} characters
          </Text>
          <Text size={1}>
            Google may show different wording. Focus keywords are planning
            notes; no SEO score or content analysis runs.
          </Text>
        </Stack>
      </Card>
      {props.renderDefault(props)}
    </Stack>
  );
}
