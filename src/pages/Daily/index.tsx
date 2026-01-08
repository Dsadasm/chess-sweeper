import NavBar from "../../components/NavBar";
import Sweeper from "../../components/Sweeper";

export default function DailyScreen() {
  return (
    <>
      <NavBar />
      <Sweeper isBoardRandom={false} />
    </>
  );
}
