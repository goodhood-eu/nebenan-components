// A mixture of https://github.com/nfl/react-helmet and https://github.com/gaearon/react-document-title
/* eslint-disable react/no-unused-prop-types */

import { Children } from 'react';
import PropTypes from 'prop-types';
import withSideEffect from 'react-side-effect';

const stringRegex = /%s/g;
const proxyProps = [
  'title',
  'description',
  'image',
  'robots',
  'canonical',
];

const parseProps = (headProps) => {
  const { title, titleTemplate, defaultTitle } = headProps;

  const result = proxyProps.reduce((acc, prop) => {
    if (headProps[prop]) acc[prop] = headProps[prop];
    return acc;
  }, {});

  if (title && titleTemplate) result.title = titleTemplate.replace(stringRegex, title);
  else if (!title && defaultTitle) result.title = defaultTitle;

  return result;
};

const reducePropsToState = (propsList) => parseProps(propsList.reduce((acc, headProps) => (
  Object.assign(acc, headProps)
), {}));

const handleStateChangeOnClient = ({ title }) => {
  if (title && title !== document.title) document.title = title;
};

const MicroHelmet = ({ children }) => (children ? Children.only(children) : null);

MicroHelmet.propTypes = {
  children: PropTypes.node,
  title: PropTypes.string,
  defaultTitle: PropTypes.string,
  titleTemplate: PropTypes.string,
  description: PropTypes.string,
  image: PropTypes.string,
  robots: PropTypes.string,
  canonical: PropTypes.string,
};

export default withSideEffect(reducePropsToState, handleStateChangeOnClient)(MicroHelmet);
