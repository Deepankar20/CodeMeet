"use client";

import { editor } from "monaco-editor";
import Editor from "@monaco-editor/react";
import { useEffect, useRef, useState } from "react";
import { useSocket } from "@/hooks/SocketContext";
import { IOperationProps } from "@/types/types";

export default function CodeEditor({ roomID }: { roomID: string }) {
  const handleSubmit = async () => {};
  const { socket } = useSocket();

  const editorRef = useRef<editor.IStandaloneCodeEditor | null>(null);
  const isRemoteChange = useRef<boolean>(false);

  const handleEditorDidMount = (editor: editor.IStandaloneCodeEditor) => {
    editorRef.current = editor;

    const model = editor.getModel();
    if (!socket || !model) return;

    const handler = (data: IOperationProps) => {
      console.log("reached here");
      const { position, length, text } = data;

      const startPos = model.getPositionAt(position);
      const endPos = model.getPositionAt(position + length);

      isRemoteChange.current = true;

      model.applyEdits([
        {
          range: {
            startLineNumber: startPos.lineNumber,
            endLineNumber: endPos.lineNumber,
            startColumn: startPos.column,
            endColumn: endPos.column,
          },
          text: data.type === "insert" ? text : "",
          forceMoveMarkers: true,
        },
      ]);

      isRemoteChange.current = false;
    };

    // Listen for remote changes
    socket.on("event:operation:reply", handler);

    // Clean up when editor is disposed
    editor.onDidDispose(() => {
      socket.off("event:operation:reply", handler);
    });
  };

  // Attach listener *after* editor is mounted

  function handleChange(
    value: string | undefined,
    event: editor.IModelContentChangedEvent
  ) {
    if (!socket || isRemoteChange.current) return;

    event.changes.forEach((change) => {
      const { rangeOffset, rangeLength, text } = change;

      if (text && rangeLength === 0) {
        socket.emit("event:operation", {
          type: "insert",
          position: rangeOffset,
          text,
          length: 0,
          roomID,
        });
      } else if (!text && rangeLength > 0) {
        socket.emit("event:operation", {
          type: "delete",
          position: rangeOffset,
          text: "",
          length: rangeLength,
          roomID,
        });
      }
    });
  }

  return (
    <Editor
      height="60vh"
      defaultLanguage="javascript"
      defaultValue=""
      onMount={(editor) => handleEditorDidMount(editor)}
      onChange={(value, event) => handleChange(value, event)}
      theme="vs-dark"
    />
  );
}
