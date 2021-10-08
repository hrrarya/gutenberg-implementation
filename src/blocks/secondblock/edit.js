import { Component } from "@wordpress/element";
import { __ } from "@wordpress/i18n";
import {
  RichText,
  BlockControls,
  AlignmentToolbar,
  InspectorControls,
  PanelColorSettings,
  withColors,
  ContrastChecker,
} from "@wordpress/editor";
import {
  ColorPicker,
  PanelBody,
  ToggleControl,
  ColorPalette,
  RangeControl,
} from "@wordpress/components";
import classnames from "classnames";

class Edit extends Component {
  handleOnChange = (value) => this.props.setAttributes({ content: value });
  handleAlignment = (textAlignment) =>
    this.props.setAttributes({ textAlignment });
  handleSwitch = (switches) => this.props.setAttributes({ switches });
  handleBgColor = (backgroundColor) =>
    this.props.setAttributes({ backgroundColor });
  handleTextColor = (textColor) => this.props.setAttributes({ textColor });
  handleShadow = () => {
    const { setAttributes } = this.props;
    setAttributes({
      shadow: !this.props.attributes.shadow,
    });
  };

  handleShadowOpacity = (value) => {
    this.props.setAttributes({
      shadowOpacity: value,
    });
  };
  render() {
    const {
      className,
      attributes,
      setBackgroundColor,
      setTextColor,
      backgroundColor,
      textColor,
    } = this.props;
    const { content, textAlignment, switches, shadow, shadowOpacity } =
      attributes;
    const classes = classnames(className, {
      "has-shadow": shadow,
      [`shadow-opacity-${shadowOpacity * 100}`]: shadow,
    });
    console.log(this.props)
    return (
      <>
        <InspectorControls>
          <PanelBody title={__("Settings", "dh-gutenberg")}>
            <RangeControl
              label={__("Box Shadow Opacity", "dh-gutenberg")}
              value={shadowOpacity}
              onChange={this.handleShadowOpacity}
              min={0.1}
              max={0.4}
              step={0.1}
            />
          </PanelBody>
          <PanelBody title={__("Panel", "dh-gutenberg")}>
            <ToggleControl
              label={__("Show Icon", "dh-gutenberg")}
              checked={switches}
              onChange={this.handleSwitch}
            />
          </PanelBody>
          <PanelColorSettings
            title={__("Color", "dh-gutenberg")}
            colorSettings={[
              {
                value: textColor.color,
                onChange: setTextColor,
                label: __("Text Color", "dh-gutenberg"),
              },
              {
                value: backgroundColor.color,
                onChange: setBackgroundColor,
                label: __("Background Color", "dh-gutenberg"),
              },
            ]}
          >
            <ContrastChecker
              textColor={textColor.color}
              backgroundColor={backgroundColor.color}
            />
          </PanelColorSettings>
        </InspectorControls>
        <BlockControls
          controls={[
            {
              icon: "wordpress",
              title: __("Box-Shadow", "dh-gutenberg"),
              onClick: this.handleShadow,
              isActive: shadow,
            },
          ]}
        >
          <AlignmentToolbar
            value={textAlignment}
            onChange={this.handleAlignment}
          />
        </BlockControls>
        <RichText
          tagName="h4"
          className={classes}
          onChange={this.handleOnChange}
          value={content}
          formattingControls={["bold"]}
          style={{
            textAlign: textAlignment,
            backgroundColor: backgroundColor.color,
            color: textColor.color,
          }}
        />
      </>
    );
  }
}

export default withColors("backgroundColor", { textColor: "color" })(Edit);
