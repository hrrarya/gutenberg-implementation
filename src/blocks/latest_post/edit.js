import { Component } from "@wordpress/element";
import { translateText } from "../../base/_helper";
import { withSelect } from "@wordpress/data";
import { decodeEntities } from "@wordpress/html-entities";
import { InspectorControls } from "@wordpress/editor";
import { PanelBody, RangeControl } from "@wordpress/components";

class LatestPost extends Component {
  handleNumOfPost = (numberOfPosts) => {
    this.props.setAttributes({
      numberOfPosts,
    });
  };
  render() {
    const { className, posts, attributes } = this.props;
    const { numberOfPosts } = attributes;
    return (
      <>
        <InspectorControls>
          <PanelBody title={translateText("Post Settings")}>
            <RangeControl
              label={translateText("Number of Post")}
              onChange={this.handleNumOfPost}
              value={numberOfPosts}
              min={1}
              max={10}
            />
          </PanelBody>
        </InspectorControls>
        <div className={className}>
          <h3>Latest Post</h3>
          <ul className="wp-block-dh-gutenberg-latest-post_list">
            {posts &&
              posts.map((el, index) => (
                <li
                  key={index}
                  className="wp-block-dh-gutenberg-latest-post_list_item"
                >
                  <a href={decodeEntities(el.guid.rendered)}>
                    {decodeEntities(el.title.rendered)}
                  </a>
                </li>
              ))}
          </ul>
        </div>
      </>
    );
  }
}

export default withSelect((select, props) => {
  const { attributes } = props;
  const { numberOfPosts } = attributes;
  let args = {
    per_page: numberOfPosts,
  };

  return {
    posts: select("core").getEntityRecords("postType", "post", args),
  };
})(LatestPost);
