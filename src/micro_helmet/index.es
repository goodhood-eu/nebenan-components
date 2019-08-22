/* eslint-disable react/no-unused-prop-types */

import { PureComponent } from 'react';
import PropTypes from 'prop-types';
import MicroHelmetContext from './context';


class MicroHelmet extends PureComponent {
  componentWillUnmount() {
    if (this.removeMetaProps) this.removeMetaProps();
  }

  render() {
    if (this.removeMetaProps) this.removeMetaProps();
    this.removeMetaProps = this.context.addMetaProps(this.props);

    return null;
  }
}

MicroHelmet.contextType = MicroHelmetContext;

MicroHelmet.propTypes = {
  title: PropTypes.string,
  defaultTitle: PropTypes.string,
  titleTemplate: PropTypes.string,
  description: PropTypes.string,
  image: PropTypes.string,
  robots: PropTypes.string,
  canonical: PropTypes.string,
};

export default MicroHelmet;
