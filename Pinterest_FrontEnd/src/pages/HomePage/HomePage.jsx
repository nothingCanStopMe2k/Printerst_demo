import { useState } from "react";
import { IconButton } from "@material-ui/core";
import AddIcon from "@material-ui/icons/Add";
import { ScrollToTop } from "./scroll";
import ArrowUpwardIcon from "@material-ui/icons/ArrowUpward";

import "./HomePage.scss";

import Post from "../../components/Post/Post";

import Content from "../../components/content/Content";

const HomePage = (props) => {
  const [isPostOpen, setPostOpen] = useState(false);

  const closePost = () => {
    setPostOpen(false);
  };

  return (
    <div className="homepage" style={{ paddingTop: "80px" }}>
      <Content pins={props.pins} />

      <div className="post-btn">
        <IconButton onClick={() => setPostOpen(!isPostOpen)}>
          <AddIcon fontSize="large" />
        </IconButton>
      </div>

      <div className="scroll-top-btn">
        <IconButton>
          <ArrowUpwardIcon fontSize="large" />
        </IconButton>
      </div>
      <ScrollToTop />
      <Post isPostOpen={isPostOpen} closePost={closePost} />
    </div>
  );
};

export default HomePage;
