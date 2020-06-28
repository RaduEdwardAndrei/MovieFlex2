import React from 'react';
import ReactPlayer from 'react-player';
import { Container } from 'react-bootstrap';

const PlayerControlExample = (props) => {
  return (
    <Container>
        <ReactPlayer
        playsInline
        poster="/assets/poster.png"
        url="https://www.youtube.com/watch?v=i5UPIf0yAKQ"
        className="container-fluid"
        controls = "true"
        volume
        />
        <video src="D:\Filelist\The.Lion.King.2019.1080p.Remux.AVC.DTS-HD.MA.7.1.RoDubbed-playBD.mp4" controls />
    </Container>
  );
};

export default PlayerControlExample;