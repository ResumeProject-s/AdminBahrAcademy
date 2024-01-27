import React from "react";
import { CommentsHolder } from "../../views/apps/comments/CommentsHolder";
import { useState } from "react";

const CommentUnaccept = () => {
  return <CommentsHolder isAccept={"false"} />;
};

export { CommentUnaccept };
