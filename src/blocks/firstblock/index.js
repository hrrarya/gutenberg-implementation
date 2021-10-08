const { registerBlockType } = wp.blocks;
const { __ } = wp.i18n;
import { InspectorControls } from "@wordpress/editor";
import { Form } from "react-bootstrap";
import { DHTabPanel, panelOptions } from "../../base/DHComponents/DHTabPanel";
import { translateText } from "../../base/_helper";

const options = [
  {
    label: translateText("Title"),
    type: "text",
    attr: "title",
    default: translateText("Title Here"),
  },
];

registerBlockType("dh-gutenberg/firstblock", {
  title: __("First Block", "dh-gutenberg"),
  description: __("Our first gutenberg block plugin", "dh-gutenberg"),
  category: "layout",
  icon: {
    foreground: "#fff",
    background: "#ddd",
    src: "admin-network",
  },
  keywords: [__("image", "dh-gutenberg"), __("photo", "dh-gutenberg")],
  attributes: {
    title: {
      type: "string",
    },
  },
  edit: function ({ attributes, setAttributes }) {
    const Design = () => {
      return <h1>This is Design Tab</h1>;
    };
    const Advanced = () => {
      return <h1>This is Advanced Tab</h1>;
    };
    return (
      <>
        <InspectorControls>
          <DHTabPanel
            layout={panelOptions(options, attributes, setAttributes)}
            design={Design}
            advanced={Advanced}
          />
        </InspectorControls>
        <div>
          <h3>{attributes.title}</h3>
        </div>
      </>
    );
  },
  save: function () {
    return <h1>Hello from firstblock</h1>;
  },
});
