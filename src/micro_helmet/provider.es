import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { Provider } from './context';
import { parseMetaProps, collectMetaProps } from './utils';


class MicroHelmetProvider extends PureComponent {
  constructor(props) {
    super(props);
    this.metaProps = [];
  }

  generateContext() {
    const { context } = this.props;
    context.meta = parseMetaProps(this.metaProps.reduce(collectMetaProps, {}));
    if (process.browser) this.onChangeInBrowser();
  }

  addMetaProps(props) {
    this.metaProps.push(props);
    this.generateContext();

    return () => {
      this.metaProps = this.metaProps.filter((item) => item !== props);
      this.generateContext();
    };
  }

  onChangeInBrowser() {
    const { title } = this.props.context.meta;
    if (title && title !== document.title) document.title = title;
  }

  render() {
    return <Provider value={this}>{this.props.children}</Provider>;
  }
}

MicroHelmetProvider.defaultProps = {
  context: {},
};

MicroHelmetProvider.propTypes = {
  context: PropTypes.object,
  children: PropTypes.any.isRequired,
};

export default MicroHelmetProvider;
