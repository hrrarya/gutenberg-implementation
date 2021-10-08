import { Component } from "@wordpress/element";
import { Tabs, Tab, Form, Row, Col } from "react-bootstrap";
import { Dashicon } from "@wordpress/components";
import "../DHComponentAssets/style.css";

class DHTabPanel extends Component {
  render() {
    const { layout: Layout, design: Design, advanced: Advanced } = this.props;
    const TabName = ({ icon, name }) => (
      <>
        <Dashicon icon={icon} />
        <p>{name}</p>
      </>
    );
    return (
      <Tabs
        defaultActiveKey="layout"
        id="uncontrolled-tab-example"
        className="mb-3 dh-gutenberg-top-panel"
      >
        <Tab
          className="mx-2"
          eventKey="layout"
          title={<TabName icon="layout" name="Layout" />}
        >
          {Layout ? Layout : ""}
        </Tab>
        <Tab eventKey="design" title={<TabName icon="edit" name="Design" />}>
          {Design ? <Design /> : ""}
        </Tab>
        <Tab
          eventKey="advanced"
          title={<TabName icon="admin-settings" name="Advanced" />}
        >
          {Advanced ? <Advanced /> : ""}
        </Tab>
      </Tabs>
    );
  }
}

const panelOptions = (options = [], attributes, setAttributes) => {
  let code = [];
  for (let index = 0; index < options.length; index++) {
    const element = options[index];

    if (element.type === "text") {
      code.push(
        <Form.Group as={Row} className="mb-3">
          <Form.Label column sm={2}>
            {element.label}
          </Form.Label>
          <Col sm={10}>
            <Form.Control
              type="text"
              placeholder={element.default || ""}
              value={attributes.title}
              onChange={(e) => {
                setAttributes({
                  ...attributes,
                  [element.attr]: e.target.value,
                });
              }}
            />
          </Col>
          <Form.Text className="text-muted">
            We'll never share your email with anyone else.
          </Form.Text>
        </Form.Group>
      );
    }
  }

  return code;
};

export { DHTabPanel, panelOptions };
