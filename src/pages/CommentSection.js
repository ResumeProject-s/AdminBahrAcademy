import React from "react";
import { Card, CardBody, CardHeader, CardText, CardTitle } from "reactstrap";
import CommentsApp from "../../views/apps/comments";
import CommentsProvider from "../utility/context/Comments/Comments";

const CommentSection = () => {
  return (
    <CommentsProvider>
      <CommentsApp />
    </CommentsProvider>
  );
};
export default CommentSection;
