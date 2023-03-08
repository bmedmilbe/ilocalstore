import React from "react";
import ReactTimeAgo from "react-time-ago";

const TimeAgo = ({ date }) => {
  return (
    <div>
      <ReactTimeAgo date={date} locale="en-UK" />
    </div>
  );
};

export default TimeAgo;
