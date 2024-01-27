import { Editor } from "react-draft-wysiwyg";
import { EditorState, ContentState } from "draft-js";
import htmlToDraft from "html-to-draftjs";
import { useState } from "react";

const TestingComp = () => {
  // const initialContent = `
  // <p>Cupcake ipsum dolor sit. Amet dessert donut candy chocolate bar cotton dessert candy chocolate. Candy muffin danish. Macaroon brownie jelly beans marzipan cheesecake oat cake. Carrot cake macaroon chocolate cake. Jelly brownie jelly. Marzipan pie sweet roll.</p>
  // <p>Liquorice dragée cake chupa chups pie cotton candy jujubes bear claw sesame snaps. Fruitcake chupa chups chocolate bonbon lemon drops croissant caramels lemon drops. Candy jelly cake marshmallow jelly beans dragée macaroon. Gummies sugar plum fruitcake. Candy canes candy cupcake caramels cotton candy jujubes fruitcake.</p>
  // `;

  // const contentBlock = htmlToDraft(initialContent);
  // const contentState = ContentState.createFromBlockArray(
  //   contentBlock.contentBlocks
  // );
  // const editorState = EditorState.createWithContent(contentState);
  // const [content, setContent] = useState(editorState);

  return (
    <div>
      {/* <Editor
        editorState={content}
        onEditorStateChange={(data) => setContent(data)}
      /> */}
      cascas
    </div>
  );
};

export default TestingComp;
