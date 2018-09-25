import React, { PureComponent } from 'react';

import Header from '../../components/header';

import Dots from '../../../lib/dots';
import HamburgerIcon from '../../../lib/hamburger_icon';
import LoadingBar, { LoadingSpinner } from '../../../lib/loading';


class Inputs extends PureComponent {
  static handleDotClick(index) {
    console.warn('Index clicked:', index);
  }

  render() {
    return (
      <article className="preview-misc">
        <Header>Misc</Header>

        <div className="preview-section">
          <LoadingBar />
          <LoadingBar active />
        </div>

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
