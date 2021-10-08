import { registerBlockType } from "@wordpress/blocks";
import { __ } from "@wordpress/i18n";
import TeamMember from "./edit";
import "./styles.editor.scss";
import "./parent";

const text_domain = "dh-gutenberg";

const attributes = {
  title: {
    type: "string",
  },
  info: {
    type: "string",
  },
  imageId: {
    type: "number",
  },
  imageAlt: {
    type: "string",
    default: "hello",
  },
  imageUrl: {
    type: "string",
  },
  socials: {
    type: "array",
    default: [
      {
        link: "https://facebook.com/hrrarya",
        icon: "facebook",
      },
      {
        link: "https://twitter.com/hrrarya",
        icon: "twitter",
      },
    ],
  },
};

registerBlockType("dh-gutenberg/team-member", {
  title: __("Team Member", text_domain),
  description: __("Block showing a Team Member", text_domain),
  icon: "admin-users",
  category: "dh-guten-text-category",
  parent: ["dh-gutenberg/team-members"],
  supports: {
    html: false,
    align: ["wide", "full"],
  },
  keywords: [
    __("team", text_domain),
    __("member", text_domain),
    __("person", text_domain),
  ],
  attributes,
  edit: TeamMember,
  save: function () {
    return null;
  },
});
