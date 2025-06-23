export type IOperationProps = {
  type: "insert" | "delete";
  position: number;
  length: number;
  text: string;
  roomID: string;
};

export type ILanguage = {
  name: string;
  piston: {
    id: string;
    version: string;
    fileName: string;
  };
  monacoId: string;
}