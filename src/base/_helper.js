import { __ } from "@wordpress/i18n";

const text_domain = "dh-gutenberg";
const translateText = (text) => __(text, text_domain);

export { translateText, text_domain };
