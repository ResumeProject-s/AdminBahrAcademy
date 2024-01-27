import React, { useState } from "react";
import { CommentsHolder } from "../../views/apps/comments/CommentsHolder";

const CommentAccept = () => {
  return <CommentsHolder isAccept={Boolean("true")} />;
};

export default CommentAccept;
