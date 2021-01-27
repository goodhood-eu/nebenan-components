import { PureComponent, createRef } from 'react';
import PropTypes from 'prop-types';
import omit from 'lodash/omit';
import clsx from 'clsx';

import keymanager from 'nebenan-helpers/lib/keymanager';
import { bindTo } from 'nebenan-helpers/lib/utils';


class ContextMenu extends PureComponent {
  constructor(props) {
    super(props);
    this.state = { isActive: false };
    this.container = createRef();
    bindTo(this,
      'handleGlobalClick',
      'hide',
      'show',
      'toggle',
    );
  }

  componentDidMount() {
    if (this.props.defaultState) this.show();
  }

  componentWillUnmount() {
    this.deactivate();
  }

  activate() {
    // # Workaround for event bubbling issue in react 17
    // Prevents the following:
    // - Some click handler calls ContextMenu.show()
    // - ContextMenu attaches global click listener
    // - Click event bubbles up from react root node to document
    // - ContextMenu global click handler is called
    setTimeout(() => {
      if (this.isListenerActive) return;
      this.stopListeningToKeys = keymanager('esc', this.hide);

      document.addEventListener('click', this.handleGlobalClick);
      this.isListenerActive = true;
    }, 1);
  }

  deactivate() {
    if (!this.isListenerActive) return;
    this.stopListeningToKeys();
    document.removeEventListener('click', this.handleGlobalClick);
    this.isListenerActive = false;
  }

  hide() {
    this.deactivate();
    if (this.isActive()) this.setState({ isActive: false }, this.props.onHide);
  }

  show() {
    this.activate();
    if (!this.isActive()) this.setState({ isActive: true }, this.props.onShow);
  }

  toggle() {
    if (this.isActive()) return this.hide();
    this.show();
  }

  isActive() {
    return this.state.isActive;
  }

  handleGlobalClick(event) {
    // click registered before rendering/after unmounting was complete
    if (!this.container.current) return;
    if (!this.container.current.contains(event.target)) this.hide();
  }

  render() {
    const className = clsx('c-context_menu', this.props.className, {
      'is-active': this.state.isActive,
    });

    const cleanProps = omit(this.props, 'children', 'label', 'defaultState', 'onHide', 'onShow');
    const label = (
      <header className="c-context_menu-label" onClick={this.toggle}>
        {this.props.label}
      </header>
    );

    return (
      <aside {...cleanProps} className={className} ref={this.container}>
        {label}
        {this.props.children}
      </aside>
    );
  }
}

ContextMenu.propTypes = {
  className: PropTypes.string,
  label: PropTypes.node,
  defaultState: PropTypes.bool,
  onHide: PropTypes.func,
  onShow: PropTypes.func,
  children: PropTypes.node,
};

export default ContextMenu;
