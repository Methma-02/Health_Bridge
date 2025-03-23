import React from "react";

const VideoBackground = () => {
  return (
    <div style={styles.container}>
      <video autoPlay loop muted style={styles.video}>
        <source src="/bg_vid.mp4" type="video/mp4" />
        Your browser does not support the video tag.
      </video>
    </div>
  );
};

const styles = {
  container: {
    position: "relative",
    width: "100vw",
    height: "100vh",
    overflow: "hidden",
  },
  video: {
    position: "absolute",
    top: "50%",
    left: "50%",
    width: "100%",
    height: "100%",
    objectFit: "cover",
    transform: "translate(-50%, -50%)",
    zIndex: -1,
  },
  content: {
    position: "relative",
    zIndex: 1,
    color: "#fff",
    textAlign: "center",
    paddingTop: "20%",
  },
};

export default VideoBackground;