"use client";

import { editor } from "monaco-editor";
import Editor from "@monaco-editor/react";
import { useEffect, useRef, useState } from "react";
import { useSocket } from "@/hooks/SocketContext";
import { IOperationProps, languages } from "@/types/types";
import axios from "axios";

export default function CodeEditor({ roomID }: { roomID: string }) {
  const handleSubmit = async () => {};
  const { socket } = useSocket();

  const editorRef = useRef<editor.IStandaloneCodeEditor | null>(null);
  const isRemoteChange = useRef<boolean>(false);
  const editorModelRef = useRef<editor.ITextModel | null>(null);

  const [loading, setLoading] = useState<boolean>(false);
  const [output, setOutput] = useState<string>("");
  const [language, setLanguage] = useState(languages[2]);

  const [currentCode, setCurrentCode] = useState<string>("");

  const handleEditorDidMount = (editor: editor.IStandaloneCodeEditor) => {
    editorRef.current = editor;

    const model = editor.getModel();

    if (!socket || !model) return;

    editorModelRef.current = model;

    const handler = (data: IOperationProps) => {
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

      setCurrentCode(editorRef.current?.getValue() as string);

      isRemoteChange.current = false;
    };

    socket.on("event:operation:reply", handler);
    socket.on("event:setLanguage:reply", (language) => {
      setLanguage(language);
      editorRef.current?.setValue("");
      setCurrentCode("");
      setOutput("");
    });

    editor.onDidDispose(() => {
      socket.off("event:operation:reply", handler);
      socket.off("event:setLanguage:reply");
    });
  };

  function handleChange(
    value: string | undefined,
    event: editor.IModelContentChangedEvent
  ) {
    if (!socket || isRemoteChange.current || !value) return;

    setCurrentCode(value);

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

  const executeCode = async () => {
    setLoading(true);
    const code = editorRef.current?.getValue();
    try {
      const res = await axios.post("https://emkc.org/api/v2/piston/execute", {
        language: language.piston.id,
        version: language.piston.version,
        files: [
          {
            name: language.piston.fileName,
            content: code,
          },
        ],
      });

      setOutput(res.data.run.output);
    } catch (err: any) {
      setOutput("Error executing code");
    }
    setLoading(false);
  };

  return (
    <div className="flex flex-col overflow-hidden">
      <div className=" bg-gray-800 text-white flex items-center p-4">
        <div>Room ID : {roomID}</div>
        <button
          className="mx-auto border border-white px-1"
          onClick={executeCode}
        >
          {loading ? "running..." : "Run"}
        </button>

        <select
          className="p-1.5 border rounded bg-black"
          value={language.piston.id}
          onChange={(e) => {
            const selected = languages.find(
              (lang) => lang.piston.id === e.target.value
            );
            if (selected) {
              setLanguage(selected);
              socket?.emit("event:setLanguage", { language: selected, roomID });

              editorRef.current?.setValue("");
              setCurrentCode("");
              setOutput("");
            }
          }}
        >
          {languages.map((lang) => (
            <option key={lang.piston.id} value={lang.piston.id}>
              {lang.name}
            </option>
          ))}
        </select>
      </div>

      <div className="flex flex-col p-4">
        <div className="h-1/2 p-2">
          <Editor
            language={language.monacoId}
            defaultLanguage={language.monacoId}
            defaultValue=""
            theme="vs-dark"
            onMount={(editor) => handleEditorDidMount(editor)}
            onChange={(value, event) => handleChange(value, event)}
            height="60vh"
            width="100%"
          />
        </div>
        <div className="h-1/2 bg-zinc-800 text-white p-4">
          <h2 className="text-lg font-semibold mb-2">Output</h2>
          <pre>{output}</pre>
        </div>
      </div>
    </div>
  );
}
