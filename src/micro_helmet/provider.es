import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { Provider } from './context';
import { parseProps, collectProps } from './utils';


class MicroHelmetProvider extends PureComponent {
  constructor(props) {
    super(props);
    this.propsArray = [];
  }

  generateContext() {
    const { context } = this.props;
    context.value = parseProps(this.propsArray.reduce(collectProps, {}));
    if (process.browser) this.onChangeInBrowser();
  }

  addProps(props) {
    this.propsArray.push(props);
    this.generateContext();

    return () => {
      this.propsArray = this.propsArray.filter((item) => item !== props);
      this.generateContext();
    };
  }

  onChangeInBrowser() {
    const { title } = this.props.context.value;
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
