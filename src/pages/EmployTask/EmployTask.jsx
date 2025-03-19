import "./employTask.css";
import { useLocation } from "react-router";
import LeftContainer from "./LeftContainer/LeftContainer";
import RightContainer from "./RightContainer/RightContainer";

export default function EmployTask() {
  const getData = useLocation();
  const data = getData.state.data;

  return (
    <div className="employ-taskpage">
      <LeftContainer data={data} />
      <RightContainer taskId={data.id} />
    </div>
  );
}
