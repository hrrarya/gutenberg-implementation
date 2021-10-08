import { Component } from "@wordpress/element";
import {
  RichText,
  MediaPlaceholder,
  BlockControls,
  InspectorControls,
  MediaUpload,
  MediaUploadCheck,
  URLInput,
} from "@wordpress/editor";
import { isBlobURL } from "@wordpress/blob";
import {
  Spinner,
  withNotices,
  Toolbar,
  IconButton,
  Panel,
  PanelBody,
  __experimentalInputControl as InputControl,
  TextControl,
  SelectControl,
  Dashicon,
} from "@wordpress/components";
import classnames from "classnames";
import { withSelect } from "@wordpress/data";
import { translateText } from "../../base/_helper";

class TeamMember extends Component {
  state = {
    selectedIcon: null,
  };

  componentDidMount() {
    const { attributes, setAttributes } = this.props;
    const { imageUrl, imageId } = attributes;

    if (imageUrl && isBlobURL(imageUrl)) {
      setAttributes({
        imageUrl: "",
        imageAlt: "",
        imageId: null,
      });
    }
  }

  componentDidUpdate(prevProps) {
    if (prevProps.isSelected && !this.props.isSelected) {
      this.setState({ selectedIcon: null });
    }
  }

  handleTitle = (title) => {
    this.props.setAttributes({
      title,
    });
  };

  handleInfo = (info) => {
    this.props.setAttributes({ info });
  };

  onSelectImage = (image) => {
    const { id, alt, url } = image;
    this.props.setAttributes({
      imageId: id,
      imageAlt: alt,
      imageUrl: url,
    });
  };

  onSelectUrl = (url) => {
    this.props.setAttributes({
      imageUrl: url,
      imageId: null,
      imageAlt: "",
    });
  };

  onChangeImageSize = (imageUrl) => {
    this.props.setAttributes({
      imageUrl,
    });
  };

  onErrorHandle = (message) => {
    this.props.noticeOperations.createErrorNotice(message);
  };

  onImageDelete = () => {
    this.props.setAttributes({
      imageUrl: "",
      imageId: null,
      imageAlt: "",
    });
  };

  handleImageAlt = (imageAlt) => {
    this.props.setAttributes({
      imageAlt,
    });
  };

  getImageSizes = () => {
    const { image, imageSizes } = this.props;
    if (!image) return [];
    const sizes = image.media_details.sizes;

    const options = [];

    for (const key in sizes) {
      const size = sizes[key];
      const imageSize = imageSizes.find((item) => item.slug === key);

      if (imageSize) {
        options.push({
          label: imageSize.name,
          value: size.source_url,
        });
      }
    }

    return options;
  };

  handleIcon = (key, name) => {
    const { socials } = this.props.attributes;
    const { selectedIcon } = this.state;

    const socialCopy = [...socials];

    const iconDetails = socialCopy[selectedIcon];
    iconDetails[key] = name;

    this.props.setAttributes({
      socials: socialCopy,
    });
  };

  removeIcon = () => {
    const { socials } = this.props.attributes;
    const { selectedIcon } = this.state;

    const selected = socials[selectedIcon];

    this.props.setAttributes({
      socials: rest,
    });
  };

  addNewIcon = () => {
    const { attributes, setAttributes } = this.props;
    const { socials } = attributes;

    setAttributes({
      socials: [
        ...socials,
        {
          icon: "linkedin",
          link: "",
        },
      ],
    });

    this.setState({ selectedIcon: socials.length });
  };

  render() {
    const { className, attributes, noticeUI, isSelected } = this.props;
    const { selectedIcon } = this.state;
    const { title, info, imageUrl, imageAlt, imageId, socials } = attributes;

    const image_class = classnames("wp-block-dh-gutenberg-team-member__image", {
      [`wp-image-${imageId}`]: imageId,
    });
    return (
      <>
        <InspectorControls>
          <Panel header="Panel">
            <PanelBody title={translateText("Image Settings")}>
              <InputControl
                label={translateText("Alt Text")}
                value={imageAlt}
                onChange={this.handleImageAlt}
                placeholder={translateText("Alt Text Here")}
              />
              <hr className="dh-gutenberg-divider" />
              <SelectControl
                label="Size"
                options={this.getImageSizes()}
                onChange={this.onChangeImageSize}
                value={imageUrl}
              />
            </PanelBody>
          </Panel>
        </InspectorControls>
        <BlockControls>
          {imageUrl && (
            <Toolbar>
              <IconButton
                label={translateText("Remove Image")}
                icon="trash"
                onClick={this.onImageDelete}
              />
            </Toolbar>
          )}
          {imageUrl && imageId && (
            <Toolbar>
              <MediaUploadCheck>
                <MediaUpload
                  onSelect={this.onSelectImage}
                  allowedTypes={["image"]}
                  value={imageId}
                  render={({ open }) => (
                    <IconButton
                      label={translateText("Edit Image")}
                      icon="edit"
                      onClick={open}
                    />
                  )}
                />
              </MediaUploadCheck>
            </Toolbar>
          )}
        </BlockControls>
        <div className={className}>
          {imageUrl ? (
            <>
              <img className={image_class} src={imageUrl} alt={imageAlt} />
              {isBlobURL(imageUrl) && <Spinner />}
            </>
          ) : (
            <MediaPlaceholder
              icon="format-image"
              onSelect={this.onSelectImage}
              onSelectURL={this.onSelectUrl}
              onError={this.onErrorHandle}
              // accept="image/*"
              allowedTypes={["image"]}
              notices={noticeUI}
            />
          )}
          <RichText
            className="wp-block-dh-gutenberg-team-member__title"
            tagName="h4"
            onChange={this.handleTitle}
            value={title}
            placeholder={translateText("Member Name")}
            formattingControls={[]}
          />
          <RichText
            className="wp-block-dh-gutenberg-team-member__info"
            tagName="p"
            onChange={this.handleInfo}
            value={info}
            placeholder={translateText("Member Info")}
            formattingControls={[]}
          />
          <ul className="wp-block-dh-gutenberg-team-member__socialIcons">
            {socials.map((el, index) => (
              <li
                key={index}
                className={
                  this.state.selectedIcon === index ? "is-selected" : null
                }
                onClick={() => this.setState({ selectedIcon: index })}
              >
                <Dashicon icon={el.icon} size={16} />
              </li>
            ))}
            {isSelected && (
              <li className="wp-block-dh-gutenberg-team-member__socialIconAdd">
                <button onClick={this.addNewIcon}>
                  <Dashicon icon="plus" size={14} />
                </button>
              </li>
            )}
          </ul>

          {selectedIcon !== null && (
            <div className="wp-block-dh-gutenberg-team-member__iconForm">
              <TextControl
                label={translateText("Icon")}
                value={socials[selectedIcon]["icon"]}
                onChange={(name) => this.handleIcon("icon", name)}
                placeholder={translateText("Icon Here")}
              />
              <URLInput
                label={translateText("Icon URL")}
                value={socials[selectedIcon]["link"]}
                onChange={(link) => this.handleIcon("link", link)}
                placeholder={translateText("Icon URL Here")}
              />
              <button onClick={this.removeIcon}>
                <Dashicon icon="trash" size="16" />
              </button>
            </div>
          )}
        </div>
      </>
    );
  }
}

export default withSelect((select, props) => {
  const { imageId: id } = props.attributes;

  return {
    image: id ? select("core").getMedia(id) : null,
    imageSizes: select("core/editor").getEditorSettings().imageSizes,
  };
})(withNotices(TeamMember));
