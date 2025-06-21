"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Save, X } from "lucide-react";
import { toast } from "sonner";
import { EditorContent, useEditor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";

const postSchema = z.object({
  title: z.string().min(1, "Title is required"),
  excerpt: z.string().min(1, "Excerpt is required"),
  content: z.string().min(1, "Content is required"),
  tags: z.string(),
  featured_image: z.string().url().optional().or(z.literal("")),
  published: z.boolean(),
});

type PostFormData = z.infer<typeof postSchema>;

interface PostEditorProps {
  post?: {
    id: string;
    title: string;
    excerpt: string;
    content: string;
    tags: string[];
    featured_image?: string;
    published: boolean;
  };
}

export function PostEditor({ post }: PostEditorProps) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [tags, setTags] = useState<string[]>(post?.tags || []);

  const editor = useEditor({
    extensions: [StarterKit],
    content: post?.content || "",
    onUpdate: ({ editor }) => {
      setValue("content", editor.getHTML());
    },
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    watch,
  } = useForm<PostFormData>({
    resolver: zodResolver(postSchema),
    defaultValues: {
      title: post?.title || "",
      excerpt: post?.excerpt || "",
      content: post?.content || "",
      tags: post?.tags.join(", ") || "",
      featured_image: post?.featured_image || "",
      published: post?.published || false,
    },
  });

  useEffect(() => {
    const tagsString = tags.join(", ");
    setValue("tags", tagsString);
  }, [tags, setValue]);

  const handleAddTag = (tag: string) => {
    const trimmedTag = tag.trim();
    if (trimmedTag && !tags.includes(trimmedTag)) {
      setTags([...tags, trimmedTag]);
    }
  };

  const handleRemoveTag = (tagToRemove: string) => {
    setTags(tags.filter((tag) => tag !== tagToRemove));
  };

  const onSubmit = async (data: PostFormData) => {
    setLoading(true);

    try {
      const postData = {
        ...data,
        tags: data.tags
          .split(",")
          .map((tag) => tag.trim())
          .filter(Boolean),
      };

      const url = post ? `/api/posts/${post.id}` : "/api/posts";
      const method = post ? "PUT" : "POST";

      const response = await fetch(url, {
        method,
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(postData),
      });

      if (response.ok) {
        toast.success(
          post ? "Post updated successfully" : "Post created successfully"
        );
        router.push("/admin");
      } else {
        throw new Error("Failed to save post");
      }
    } catch (error) {
      console.error("Error saving post:", error);
      toast.error("Failed to save post");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto">
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
        <Card>
          <CardHeader>
            <CardTitle>{post ? "Edit Post" : "Create New Post"}</CardTitle>
            <CardDescription>
              Fill in the details below to {post ? "update" : "create"} your
              blog post
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="title">Title</Label>
              <Input
                id="title"
                {...register("title")}
                placeholder="Enter post title"
              />
              {errors.title && (
                <p className="text-sm text-destructive">
                  {errors.title.message}
                </p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="excerpt">Excerpt</Label>
              <Input
                id="excerpt"
                {...register("excerpt")}
                placeholder="Brief description of the post"
              />
              {errors.excerpt && (
                <p className="text-sm text-destructive">
                  {errors.excerpt.message}
                </p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="featured_image">Featured Image URL</Label>
              <Input
                id="featured_image"
                {...register("featured_image")}
                placeholder="https://example.com/image.jpg"
                type="url"
              />
              {errors.featured_image && (
                <p className="text-sm text-destructive">
                  {errors.featured_image.message}
                </p>
              )}
            </div>

            <div className="space-y-2">
              <Label>Tags</Label>
              <div className="flex flex-wrap gap-2 mb-2">
                {tags.map((tag) => (
                  <Badge
                    key={tag}
                    variant="secondary"
                    className="cursor-pointer"
                  >
                    {tag}
                    <X
                      className="ml-1 h-3 w-3"
                      onClick={() => handleRemoveTag(tag)}
                    />
                  </Badge>
                ))}
              </div>
              <Input
                placeholder="Enter tags separated by commas"
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    e.preventDefault();
                    handleAddTag(e.currentTarget.value);
                    e.currentTarget.value = "";
                  }
                }}
              />
              <p className="text-sm text-muted-foreground">
                Press Enter to add a tag
              </p>
            </div>

            <div className="space-y-2">
              <Label>Content</Label>
              <div className="prose prose-sm dark:prose-invert border rounded-md p-2">
                <EditorContent editor={editor} />
              </div>
              {errors.content && (
                <p className="text-sm text-destructive">
                  {errors.content.message}
                </p>
              )}
            </div>

            <div className="flex items-center space-x-2">
              <Switch
                id="published"
                {...register("published")}
                onCheckedChange={(checked) => setValue("published", checked)}
              />
              <Label htmlFor="published">Published</Label>
            </div>
          </CardContent>
        </Card>

        <div className="flex items-center justify-between">
          <Button type="button" variant="outline" onClick={() => router.back()}>
            Cancel
          </Button>
          <Button type="submit" disabled={loading}>
            <Save className="mr-2 h-4 w-4" />
            {loading ? "Saving..." : "Save Post"}
          </Button>
        </div>
      </form>
    </div>
  );
}
