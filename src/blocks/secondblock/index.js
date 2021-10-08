import { registerBlockType, createBlock } from "@wordpress/blocks";
import { __ } from "@wordpress/i18n";
import { getColorClassName, RichText } from "@wordpress/editor";
import Edit from "./edit";

const attributes = {
  content: {
    type: "string",
  },
  blocknames: {
    type: "string",
    default: "secondblock",
  },
  textAlignment: {
    type: "string",
  },
  switches: {
    type: "boolean",
  },
  backgroundColor: {
    type: "string",
  },
  textColor: {
    type: "string",
  },
  customBackgroundColor: {
    type: "string",
  },
  customTextColor: {
    type: "string",
  },
  shadow: {
    type: "boolean",
    default: false,
  },
  shadowOpacity: {
    type: "number",
    default: 0.3,
  },
};

registerBlockType("dh-gutenberg/secondblock", {
  title: __("Second Block", "dh-gutenberg"),
  description: __("Our first gutenberg block plugin", "dh-gutenberg"),
  category: "dh-guten-text-category",
  icon: {
    foreground: "#fff",
    background: "#ddd",
    src: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        height="24px"
        viewBox="0 0 24 24"
        width="24px"
        fill="#000000"
      >
        <path d="M0 0h24v24H0z" fill="none" />
        <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
      </svg>
    ),
  },
  transforms: {
    from: [
      {
        type: 'block',
        blocks: 'core/paragraph',
        transform:( { content, align} ) => {
          return createBlock('dh-gutenberg/secondblock', {
            content: content,
            textAlignment: align
          });
        }
      },
      {
        type: 'prefix',
        prefix: 'secondblock',
        transform:( { content, align} ) => {
          return createBlock('dh-gutenberg/secondblock', {
            content: content,
            textAlignment: align
          });
        } 
      }
    ],
    to: [
    {
      type: 'block',
      blocks: ['core/paragraph'],
      isMatch: ( { content }) => {
        return content ? true : false;
      },
      transform:( { content, textAlignment} ) => {
          return createBlock('core/paragraph', {
            content: content,
            align: textAlignment
          });
        } 
    }]
  },
  keywords: [__("image", "dh-gutenberg"), __("photo", "dh-gutenberg")],
  styles: [
    {
      name: "rounded",
      label: __("Rounded", "dh-gutenberg"),
      isDefault: true,
    },
    {
      name: "outline",
      label: __("Outline", "dh-gutenberg"),
    },
    {
      name: "squared",
      label: __("Squared", "dh-gutenberg"),
    },
  ],
  attributes,
  edit: Edit,
  save: function (props) {
    return null;
  },
});
