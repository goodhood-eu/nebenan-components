import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import debounce from 'lodash/debounce';
import { bindTo } from 'nebenan-helpers/lib/utils';

import { Provider } from './context';
import { parseProps } from './utils';


const BROWSER_UPDATE_LIMIT = 300;
const isServerEnv = (
  typeof process !== 'undefined' && process && process.versions && process.versions.node
);

class MicroHelmetProvider extends PureComponent {
  constructor(props) {
    super(props);

    bindTo(
      this,
      'addProps',
    );

    this.propsArray = [];
    this.staticContext = this.getDefaultContext();
  }

  componentDidMount() {
    this.updateBrowserTitle = debounce(this.updateBrowserTitle, BROWSER_UPDATE_LIMIT);
  }

  getDefaultContext() {
    const { addProps } = this;
    return { addProps };
  }

  generateContext() {
    const { context } = this.props;
    context.value = parseProps(Object.assign({}, ...this.propsArray));
    if (!isServerEnv) this.updateBrowserTitle();
  }

  addProps(props) {
    this.propsArray.push(props);
    this.generateContext();

    return () => {
      this.propsArray = this.propsArray.filter((item) => item !== props);
      this.generateContext();
    };
  }

  updateBrowserTitle() {
    const { title } = this.props.context.value;
    if (title && title !== document.title) document.title = title;
  }

  render() {
    return <Provider value={this.staticContext}>{this.props.children}</Provider>;
  }
}

MicroHelmetProvider.defaultProps = {
  context: {},
};

MicroHelmetProvider.propTypes = {
  context: PropTypes.object,
  children: PropTypes.node.isRequired,
};

export default MicroHelmetProvider;
