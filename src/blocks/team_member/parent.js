import { InnerBlocks, InspectorControls } from "@wordpress/editor";
import { registerBlockType } from "@wordpress/blocks";
import { __ } from "@wordpress/i18n";
import { PanelBody, RangeControl } from "@wordpress/components";

const text_domain = "dh-gutenberg";
const child_block = "dh-gutenberg/team-member";
const attributes = {
  columns: {
    type: "number",
    default: 2,
  },
};

registerBlockType("dh-gutenberg/team-members", {
  title: __("Team Members", text_domain),
  description: __("Add Team Members as much you want", text_domain),
  icon: "grid-view",
  category: "dh-guten-text-category",
  keywords: [
    __("team", text_domain),
    __("member", text_domain),
    __("person", text_domain),
    __("users", text_domain),
  ],
  supports: {
    html: false,
  },
  attributes,
  edit: ({ className, attributes, setAttributes }) => {
    const { columns } = attributes;
    const handleColumns = (columns) => setAttributes({ columns });
    return (
      <div className={`${className} has-${columns}-columns`}>
        <InspectorControls>
          <PanelBody title={__("Settings", text_domain)}>
            <RangeControl
              label={__("Column", text_domain)}
              value={columns}
              onChange={handleColumns}
              min={1}
              max={6}
              step={1}
            />
          </PanelBody>
        </InspectorControls>
        <InnerBlocks
          allowedBlocks={[child_block]}
          template={[[child_block], [child_block]]}
        />
      </div>
    );
  },
  save: ({ className, attributes }) => {
    const { columns } = attributes;
    return (
      <div className={`${className} has-${columns}-columns`}>
        <InnerBlocks.Content />
      </div>
    );
  },
});
