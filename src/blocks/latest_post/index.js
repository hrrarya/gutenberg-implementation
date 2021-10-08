import { registerBlockType } from "@wordpress/blocks";
import "./styles.editor.scss";
import { translateText } from "../../base/_helper";
import LatestPost from "./edit";

const attributes = {
  numberOfPosts: {
    type: "number",
    default: 5,
  },
};
registerBlockType("dh-gutenberg/latest-post", {
  title: translateText("DH Latest Post"),
  description: translateText("Pull latest post"),
  icon: "embed-post",
  category: "dh-guten-text-category",
  supports: {
    html: false,
  },
  keywords: [
    translateText("post"),
    translateText("blog"),
    translateText("latest"),
  ],
  attributes,
  edit: LatestPost,
  save: function () {
    return null;
  },
});
