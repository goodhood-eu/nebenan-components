import React, { PureComponent } from 'react';

import Header from '../../components/header';

import Dots from '../../../lib/dots';
import HamburgerIcon from '../../../lib/hamburger_icon';
import LoadingBar, { LoadingSpinner } from '../../../lib/loading';


class Inputs extends PureComponent {
  constructor(props) {
    super(props);
    this.state = { loading: true };
  }

  static handleDotClick(index) {
    console.warn('Index clicked:', index);
  }

  componentDidMount() {
    this._tid = setTimeout(() => this.setState({ loading: false }), 1500);
  }

  componentWillUnmount() {
    clearTimeout(this._tid);
  }

  render() {
    return (
      <article className="preview-misc">
        <Header>Misc</Header>

        <LoadingBar active={this.state.loading} />

        <div className="preview-section">
          <LoadingSpinner />
        </div>

        <div className="preview-section">
          <Dots count={10} active={3} onItemClick={this.constructor.handleDotClick} />
        </div>

        <div className="preview-section">
          <Dots count={10} onItemClick={this.constructor.handleDotClick} />
        </div>

        <div className="preview-section">
          <p><HamburgerIcon /></p>
          <p><HamburgerIcon active /></p>
        </div>
      </article>
    );
  }
}

export default Inputs;
