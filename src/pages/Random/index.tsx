import { useState } from "react";
import Board from "../../components/Board";

export default function RandomScreen() {
  const [boardState, setBoardState] = useState<"reveal" | "guess">("reveal");
  const [point, setPoint] = useState(15);

  return (
    <>
      <Board state={boardState} setPoint={setPoint} />
    </>
  );
}
