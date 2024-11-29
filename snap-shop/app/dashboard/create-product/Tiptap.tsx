"use client";

import { Toggle } from "@/components/ui/toggle";
import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import {
  Bold,
  Heading1,
  Italic,
  List,
  ListOrdered,
  Strikethrough,
} from "lucide-react";
import { useFormContext } from "react-hook-form";

type TiptapProps = {
  val: string;
};

const Tiptap = ({ val }: TiptapProps) => {
  const { setValue } = useFormContext();

  const editor = useEditor({
    extensions: [
      StarterKit.configure({
        orderedList: {
          HTMLAttributes: { class: "list-decimal pl-4" },
        },
        bulletList: {
          HTMLAttributes: { class: "list-disc pl-4" },
        },
        heading: {
          HTMLAttributes: { class: "text-2xl font-bold" },
          levels: [1],
        },
      }),
    ],
    content: val,
    editorProps: {
      attributes: {
        class:
          "min-h-[80px] w-full rounded-md border border-black bg-background px-3 py-2 text-sm shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50",
      },
    },
    onUpdate: ({ editor }) => {
      const content = editor.getHTML();
      setValue("description", content, {
        shouldValidate: true,
        shouldDirty: true,
      });
    },
  });

  return (
    <div className="space-y-2">
      {editor && (
        <div>
          <Toggle
            pressed={editor.isActive("heading", { level: 1 })}
            onPressedChange={() =>
              editor.chain().focus().toggleHeading({ level: 1 }).run()
            }
            size={"sm"}
          >
            <Heading1 className="size-4" />
          </Toggle>
          <Toggle
            pressed={editor.isActive("bold")}
            onPressedChange={() => editor.chain().focus().toggleBold().run()}
            size={"sm"}
          >
            <Bold className="size-4" />
          </Toggle>
          <Toggle
            pressed={editor.isActive("italic")}
            onPressedChange={() => editor.chain().focus().toggleItalic().run()}
            size={"sm"}
          >
            <Italic className="size-4" />
          </Toggle>
          <Toggle
            pressed={editor.isActive("strike")}
            onPressedChange={() => editor.chain().focus().toggleStrike().run()}
            size={"sm"}
          >
            <Strikethrough className="size-4" />
          </Toggle>
          <Toggle
            pressed={editor.isActive("orderedList")}
            onPressedChange={() =>
              editor.chain().focus().toggleOrderedList().run()
            }
            size={"sm"}
          >
            <ListOrdered className="size-4" />
          </Toggle>
          <Toggle
            pressed={editor.isActive("bulletList")}
            onPressedChange={() =>
              editor.chain().focus().toggleBulletList().run()
            }
            size={"sm"}
          >
            <List className="size-4" />
          </Toggle>
        </div>
      )}
      <EditorContent editor={editor} />
    </div>
  );
};

export default Tiptap;
