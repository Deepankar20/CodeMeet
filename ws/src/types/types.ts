export type IOperationProps = {
  type: "insert" | "delete";
  position: number;
  length: number;
  text: string;
  roomID: string;
};
