"use client"
import React, { useEffect, useRef } from 'react';
import { useMutation } from 'convex/react';
import { api } from '@/convex/_generated/api';
import { toast } from 'sonner';
import { FILE } from '../../dashboard/_components/FileList';

interface EditorProps {
  onSaveTrigger: any;
  fileId: any;
  fileData: FILE;
}

function Editor({ onSaveTrigger, fileId, fileData }: EditorProps) {
  const editorRef = useRef<any>();
  const updateDocument = useMutation(api.files.updateDocument);

  const initEditor = async () => {
    // Dynamically import EditorJS and its plugins so this code is only run on the client.
    const EditorJS = (await import('@editorjs/editorjs')).default;
    const Header = (await import('@editorjs/header')).default;
    const List = (await import("@editorjs/list")).default;
    const Checklist = (await import('@editorjs/checklist')).default;
    const Paragraph = (await import('@editorjs/paragraph')).default;
    const Warning = (await import('@editorjs/warning')).default;

    // Use a fallback if no document is available.
    let editorData = { time: Date.now(), blocks: [], version: "2.8.1" };
    if (fileData?.document) {
      try {
        const parsed = JSON.parse(fileData.document);
        if (!Array.isArray(parsed.blocks)) {
          parsed.blocks = [];
        }
        editorData = parsed;
      } catch (error) {
        console.error("Failed to parse document, using fallback.", error);
      }
    }

    const editor = new EditorJS({
      holder: 'editorjs',
      tools: {
        header: {
          class: Header,
          shortcut: 'CMD+SHIFT+H',
          config: {
            placeholder: 'Enter a Header',
          },
        },
        list: {
          class: List,
          inlineToolbar: true,
          config: { defaultStyle: 'unordered' },
        },
        checklist: {
          class: Checklist,
          inlineToolbar: true,
        },
        paragraph: Paragraph,
        warning: Warning,
      },
      data: editorData,
    });

    editorRef.current = editor;
  };

  useEffect(() => {
    // Initialize editor on client-side once fileData is available.
    if (fileData) {
      initEditor();
    }
  }, [fileData]);

  useEffect(() => {
    if (onSaveTrigger && editorRef.current) {
      editorRef.current
        .save()
        .then((outputData: any) => {
          updateDocument({
            _id: fileId,
            document: JSON.stringify(outputData),
          })
            .then(() => toast('Document Updated!'))
            .catch(() => toast('Server Error!'));
        })
        .catch((error: any) => {
          console.error('Saving failed: ', error);
        });
    }
  }, [onSaveTrigger]);

  return <div id="editorjs" />;
}

export default Editor;