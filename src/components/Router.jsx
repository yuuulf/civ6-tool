import { Routes, Route } from "react-router-dom";
import HallOfFame from "../pages/HallOfFame";
import LeaderMaster from "../pages/LeaderMaster";

export default function Router() {
  return (
    <Routes>
      <Route path="/" element={<HallOfFame />} />
      <Route path="/leader-master" element={<LeaderMaster />} />
    </Routes>
  );
}
