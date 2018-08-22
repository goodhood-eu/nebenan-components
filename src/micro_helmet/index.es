// A mixture of https://github.com/nfl/react-helmet and https://github.com/gaearon/react-document-title
/* eslint-disable react/no-unused-prop-types */
import React, { PureComponent } from 'react';
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

const reducePropsToState = (propsList) => {
  const result = propsList.reduce((acc, prop) => {
    if (propsList[prop]) Object.assign(acc, prop);
    return acc;
  }, {});

  return parseProps(result);
};

const handleStateChangeOnClient = ({ title }) => {
  if (title && title !== document.title) document.title = title;
};

class MicroHelmet extends PureComponent {
  render() {
    const { children } = this.props;
    const content = children ? React.Children.only(children) : null;
    return content;
  }
}

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
