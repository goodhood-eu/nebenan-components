import React, { PureComponent } from 'react';

import Header from '../../components/header';

import Badge, {
  BADGE_GOLD_GREEN,
  BADGE_GOLD_BLUE,
  BADGE_GREEN,
  BADGE_BLUE,
  BADGE_PURPLE,
} from '../../../lib/badge';
import Dots from '../../../lib/dots';
import HamburgerIcon from '../../../lib/hamburger_icon';
import IconBox, { TYPE_LARGE as ICON_TYPE_LARGE } from '../../../lib/icon_box';
import DateBox, { TYPE_LARGE as DATE_TYPE_LARGE } from '../../../lib/date_box';
import Logo from '../../../lib/logo';
import LoadingBar, { LoadingSpinner } from '../../../lib/loading';

const todayDate = (new Date()).toISOString();
const greatDate = (new Date('1988-05-27T23:37:00')).toISOString();


class Misc extends PureComponent {
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
          <IconBox />
          <IconBox active={false} />
          <IconBox icon="icon-bell" />
          <IconBox icon="icon-bell" type={ICON_TYPE_LARGE} />
        </div>

        <div className="preview-section">
          <DateBox date={todayDate} />
          <DateBox date={todayDate} active={false} />
          <DateBox date={greatDate} />
        </div>

        <div className="preview-section">
          <Logo />
          <Logo>amazing subtitle</Logo>
          <Logo to="/" />
          <Logo compact />
          <Logo compact to="/" />
        </div>

        <div className="preview-section preview-dark">
          <Logo />
          <Logo>Für nette Leute</Logo>
          <Logo to="/" />
          <Logo compact />
          <Logo compact to="/" />
        </div>

        <div className="preview-section">
          <Logo localeName="fr_fr" />
          <Logo localeName="fr_fr">amazing subtitle</Logo>
          <Logo localeName="fr_fr" to="/" />
          <Logo localeName="fr_fr" compact />
          <Logo localeName="fr_fr" compact to="/" />
        </div>

        <div className="preview-section preview-dark">
          <Logo localeName="fr_fr" />
          <Logo localeName="fr_fr">Für nette Leute</Logo>
          <Logo localeName="fr_fr" to="/" />
          <Logo localeName="fr_fr" compact />
          <Logo localeName="fr_fr" compact to="/" />
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

        <div className="preview-section">
          <Badge type={BADGE_GREEN} />
          <Badge type={BADGE_BLUE} />
          <Badge type={BADGE_GOLD_GREEN} />
          <Badge type={BADGE_GOLD_BLUE} />
          <Badge type={BADGE_PURPLE} />
        </div>
      </article>
    );
  }
}

export default Misc;
