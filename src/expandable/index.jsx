import { PureComponent } from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';


class Expandable extends PureComponent {
  constructor(props) {
    super(props);
    this.handleControlClick = this.handleControlClick.bind(this);
    this.state = { isActive: props.defaultState };
  }

  handleControlClick() {
    this.setState((prevState) => ({ isActive: !prevState.isActive }), this.props.onUpdate);
  }

  render() {
    const { isActive } = this.state;
    const {
      children,
      defaultState,
      control,
      onUpdate,
      expandableContentClassName: passedExpandableContentClassName,
      ...cleanProps
    } = this.props;
    const className = clsx('c-expandable', this.props.className, {
      'is-active': isActive,
    });
    const expandableContentClassName = clsx('c-expandable-content', passedExpandableContentClassName);

    const content = isActive && <div className={expandableContentClassName}>{children}</div>;

    return (
      <article {...cleanProps} className={className}>
        <aside className="c-expandable-control" onClick={this.handleControlClick}>
          {control}
        </aside>
        {content}
      </article>
    );
  }
}

Expandable.defaultProps = {
  defaultState: false,
};

Expandable.propTypes = {
  className: PropTypes.string,
  expandableContentClassName: PropTypes.string,
  control: PropTypes.node.isRequired,
  defaultState: PropTypes.bool.isRequired,
  onUpdate: PropTypes.func,
  children: PropTypes.node,
};

export default Expandable;
