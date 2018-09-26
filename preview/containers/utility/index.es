import React, { PureComponent, createRef } from 'react';

import Header from '../../components/header';

import FilePicker from '../../../lib/file_picker';
import Scrollable from '../../../lib/scrollable';
import ContextMenu from '../../../lib/context_menu';
import ContextList from '../../../lib/context_list';
import Infinite from '../../../lib/infinite';

import content from '../../sample_data';

const getOption = (key, list) => list[key].title;

const STEP = 30;


class Inputs extends PureComponent {
  constructor(props) {
    super(props);
    this.menu = createRef();
    this.list = createRef();
    this.list_menu = createRef();
    this.handleToggleMenu = this.handleToggleMenu.bind(this);
    this.handleListSelect = this.handleListSelect.bind(this);
    this.handleActivateList = this.handleActivateList.bind(this);
    this.handleDeactivateList = this.handleDeactivateList.bind(this);
    this.handleLoadMore = this.handleLoadMore.bind(this);

    this.state = {
      loaded: 0,
      isLoading: false,
    };
  }

  handleToggleMenu() {
    this.menu.current.toggle();
  }

  handleSelect(files) {
    console.info('Selected:', files[0]);
  }

  handleShow(index) {
    console.info('Show', index);
  }

  handleHide(index) {
    console.info('Hide', index);
  }

  handleListSelect(key, list) {
    console.warn('List selected:', list[key]);
    this.list_menu.current.hide();
  }

  handleActivateList() {
    this.list.current.activate();
  }

  handleDeactivateList() {
    this.list.current.deactivate();
  }

  handleLoadMore() {
    this.setState({ isLoading: true });

    this.tid = setTimeout((state) => {
      this.setState({ isLoading: false, loaded: state.loaded + STEP });
    }, 3000);
  }

  render() {
    return (
      <article className="preview-utility">
        <Header>Utility</Header>
        <div className="preview-section">
          <FilePicker onSelect={this.handleSelect}>
            <span className="ui-button ui-button-primary">Upload</span>
          </FilePicker>
        </div>

        <div className="preview-section">
          <Scrollable>
            <img
              width="95%" alt=""
              src="http://i1.kym-cdn.com/photos/images/facebook/000/002/110/longcat.jpg"
            />
          </Scrollable>
        </div>

        <div className="preview-section">
          <ul>
            <li>
              <span
                className="ui-button ui-button-primary ui-button-small"
                onClick={this.handleToggleMenu}
              >
                toggle 1 externally
              </span>
            </li>
            <li>
              <ContextMenu
                ref={this.menu}
                onShow={this.handleShow.bind(this, 1)}
                onHide={this.handleHide.bind(this, 1)}
                label="MENU 1"
              >
                <p className="preview-context-content">CONTENT 1!</p>
              </ContextMenu>
            </li>
            <li>
              <ContextMenu
                onShow={this.handleShow.bind(this, 2)}
                onHide={this.handleHide.bind(this, 2)}
                label="MENU 2" defaultState
              >
                <p className="preview-context-content">CONTENT 2!</p>
              </ContextMenu>
            </li>
          </ul>
        </div>

        <div className="preview-section">
          <ContextMenu
            label="Show list"
            ref={this.list_menu}
            onShow={this.handleActivateList}
            onHide={this.handleDeactivateList}
          >
            <ContextList
              className="preview-context-content ui-options"
              ref={this.list}
              options={content.content_array}
              getOption={getOption}
              onSelect={this.handleListSelect}
            />
          </ContextMenu>
        </div>

        <Infinite onActive={this.handleLoadMore} loading={this.state.isLoading} />

      </article>
    );
  }
}

export default Inputs;
