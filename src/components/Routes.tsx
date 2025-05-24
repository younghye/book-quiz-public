import { Routes as Switch, Route } from "react-router-dom";
import { CustomErrorName } from "./ErrorBoundary";
import Home from "../pages/Home";
import Quizs from "../pages/Quizs";
import Video from "../pages/Video";

export default function Routes() {
  function NotFound() {
    const error = new Error("Sorry, we couldn't find this page.");
    error.name = CustomErrorName;
    throw error;
    // eslint-disable-next-line
    return null;
  }

  return (
    <>
      <Switch>
        <Route>
          <Route path="/home" element={<Home />} />
          <Route path="/quizs" element={<Quizs />} />
          <Route path="/video" element={<Video />} />
          <Route path="/" element={<Home />} />
          <Route path="*" element={<NotFound />} />
        </Route>
      </Switch>
    </>
  );
}
