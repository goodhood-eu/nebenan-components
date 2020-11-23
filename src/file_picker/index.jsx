import { PureComponent, createRef } from 'react';
import PropTypes from 'prop-types';
import omit from 'lodash/omit';
import clsx from 'clsx';


class FilePicker extends PureComponent {
  constructor(props) {
    super(props);
    this.input = createRef();
    this.handleChange = this.handleChange.bind(this);
  }

  getInput() {
    return this.input.current;
  }

  handleChange(event) {
    const { files } = event.target;

    // some browsers trigger change with empty set
    if (this.props.onSelect && files.length) this.props.onSelect(files);

    if (this.props.onChange) this.props.onChange(event);
    this.input.current.value = '';
  }

  render() {
    const className = clsx('c-file_picker', this.props.className);
    const cleanProps = omit(this.props, 'onSelect', 'children', 'className');

    return (
      <span className={className}>
        {this.props.children}
        <input
          {...cleanProps}
          ref={this.input}
          type="file"
          className="c-file_picker-input"
          onChange={this.handleChange}
        />
      </span>
    );
  }
}

FilePicker.propTypes = {
  className: PropTypes.string,
  children: PropTypes.node,
  onChange: PropTypes.func,
  onSelect: PropTypes.func,
};

export default FilePicker;
