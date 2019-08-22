import { PureComponent } from 'react';
import PropTypes from 'prop-types';
import MicroHelmetContext from './context';


class MicroHelmet extends PureComponent {
  componentWillUnmount() {
    if (this.removeMetaProps) this.removeMetaProps();
  }

  render() {
    const {
      title,
      defaultTitle,
      titleTemplate,
      description,
      image,
      robots,
      canonical,
    } = this.props;

    if (this.removeMetaProps) this.removeMetaProps();

    this.removeMetaProps = this.context.addMetaProps({
      title,
      defaultTitle,
      titleTemplate,
      description,
      image,
      robots,
      canonical,
    });

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
