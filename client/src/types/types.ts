export type IOperationProps = {
  type: "insert" | "delete";
  position: number;
  length: number;
  text: string;
  roomID: string;
};

export const  languages = [
  {
    name: "Python",
    piston: { id: "python3", version: "3.10.0", fileName: "main.py" },
    monacoId: "python",
  },
  {
    name: "JavaScript",
    piston: { id: "javascript", version: "18.15.0", fileName: "main.js" },
    monacoId: "javascript",
  },
  {
    name: "C++",
    piston: { id: "cpp", version: "10.2.0", fileName: "main.cpp" },
    monacoId: "cpp",
  },
  {
    name: "Java",
    piston: { id: "java", version: "15.0.2", fileName: "Main.java" },
    monacoId: "java",
  },
];