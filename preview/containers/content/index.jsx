import { PureComponent, createRef } from 'react';
import uniq from 'lodash/uniq';
import { emojiCollection } from 'emojitsu';
import { bindTo } from 'nebenan-helpers/lib/utils';

import { getMergedRef } from 'nebenan-react-hocs/lib/proxy_ref';

import Header from '../../components/header';

import ClipboardText from '../../../lib/clipboard_text';
import ContentHeader from '../../../lib/content_header';
import EmailLink from '../../../lib/email_link';
import PopupLink from '../../../lib/popup_link';
import Emoji from '../../../lib/emoji';
import EmojiSuggestions from '../../../lib/emoji_suggestions';
import TabBar from '../../../lib/tab_bar';
import FlatTabBar from '../../../lib/flat_tab_bar';
import LinkHeader from '../../../lib/link_header';
import Progress from '../../../lib/progress';
import ProgressLine from '../../../lib/progress_line';
import PhoneNumber from '../../../lib/phone_number';
import PhoneLink from '../../../lib/phone_link';
import Autocomplete from '../../../lib/autocomplete';
import TagCloud from '../../../lib/tag_cloud';
import TagsPicker from '../../../lib/tags_picker';


import content from '../../sample_data';

const tags = [
  'edible',
  'deadpan',
  'whisper',
  'loss',
  'stream',
  'frantic',
];

const emoji = 'Hello 👩🏿😎🙈🏳️‍🌈👨‍👨‍👧‍👦';
const suggestions = emojiCollection
  .filter(({ suggest, category }) => (suggest && category === 'people'))
  .map(({ shortname }) => shortname);


suggestions.length = 20;

const headerAction = (
  <span className="ui-button ui-button-small ui-button-primary">Button</span>
);

const action = <i className="icon-cross ui-link" />;


class Inputs extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      suggestions: [],
      extraItems: [],
    };

    bindTo(
      this,
      'handleClipboardTextCopy',
      'handleAutocomplete',
      'handleTagsPickerSelect',
    );

    this.clipboardText = createRef();
  }

  getMergedRefFn() {
    return getMergedRef(this.props.forwardedRef, (ref) => { this.inputRef = ref; });
  }

  handleClipboardTextCopy() {
    const result = this.clipboardText.current.copyToClipboard();
    console.warn('ClipboardText content copy:', result);
  }

  handleSelect(key, list) {
    console.warn('Selected emoji:', list[key]);
  }

  handleTagsPickerSelect(tag) {
    const inputValue = this.inputRef.current.getValue();
    const value = inputValue ? inputValue.concat([tag]) : [tag];
    const stateUpdate = (prevState) => ({ extraItems: prevState.extraItems.concat([tag]) });
    const callback = () => this.setState(stateUpdate);

    this.inputRef.current.setValue(value, callback);
  }

  handleAutocomplete(value) {
    console.info('Got autocomplete input:', value);
    const autocompleteSuggestions = (value && value.length) ? value.split('') : [];
    this.setState({ suggestions: autocompleteSuggestions });
  }

  render() {
    return (
      <article className="preview-content">
        <Header>Content</Header>

        <div className="preview-section preview-progress">
          <ul>
            <li><Progress state={.75} /></li>
            <li><Progress state="75%" size="small" /></li>
            <li><Progress state={0} /></li>
            <li><Progress state="0%" size="small" /></li>
          </ul>
          <ul>
            <li><Progress state={75} type="secondary" /></li>
            <li><Progress state="75%" type="secondary" size="small" /></li>
            <li><Progress state={0} type="secondary" /></li>
            <li><Progress state="0%" type="secondary" size="small" /></li>
          </ul>
        </div>

        <div className="preview-section preview-progress_line">
          <ul>
            <li><ProgressLine /></li>
            <li><ProgressLine steps={3} current={1} /></li>
            <li><ProgressLine steps={10} current={4} /></li>
            <li><ProgressLine steps={10} current={9} /></li>
          </ul>
        </div>

        <div className="preview-section">
          <Emoji text={emoji} />
        </div>

        <div className="preview-section">
          <Emoji text={emoji} limit={20} />
        </div>

        <div className="preview-section">
          <Emoji className="preview-single-emoji" text=":poop:" options={{ size: 128 }} />
        </div>

        <div className="preview-section">
          <EmojiSuggestions className="ui-card" options={suggestions} onSelect={this.handleSelect} />
        </div>

        <div className="preview-section">
          <div className="ui-card">
            <TabBar activeIndex={2} items={content.listArray} action={action}>
              Extra content
            </TabBar>
            <div className="ui-card-section">{content.lorem.slice(0, 26)}</div>
          </div>
        </div>

        <div className="preview-section">
          <div className="ui-card">
            <FlatTabBar activeIndex={0} items={[{ text: 'One' }, { text: 'Two' }]} />
            <div className="ui-card-section">{content.lorem.slice(0, 26)}</div>
          </div>
        </div>

        <div className="preview-section">
          <LinkHeader to="/">
            <span className="ui-h3">Link Header</span>
            Content!
          </LinkHeader>
        </div>

        <div className="preview-section">
          <LinkHeader to="/" reversed>
            <span className="ui-h3">Link Header</span>
            Content!
          </LinkHeader>
        </div>

        <div className="preview-section preview-clipboard_text">
          <ClipboardText className="ui-input" ref={this.clipboardText}>
            {content.lorem}
          </ClipboardText>
          <button
            type="button"
            className="ui-button ui-button-primary ui-button-small"
            onClick={this.handleClipboardTextCopy}
          >
            Copy to clipboard
          </button>
        </div>

        <div className="preview-section">
          <ContentHeader
            title="Optional Headline" description="Optional Description" action={headerAction}
          >
            <a href="/sandbox/content">Link</a>
          </ContentHeader>
          <ContentHeader
            title="Optional Headline" description="Optional Description" action={headerAction}
          />
          <ContentHeader title="Optional Headline" description="Optional Description" />
          <ContentHeader />
          <ContentHeader>Aint no thing but a chicken wing</ContentHeader>
        </div>

        <div className="preview-section">
          <p><EmailLink to="me@example.com">Email link</EmailLink></p>
          <p><EmailLink to="me@example.com" body="testbody">Email link + body</EmailLink></p>
          <p>
            <EmailLink to="me@example.com" subject="testsubject woo" body="multiple word test body">
              Email link + full query
            </EmailLink>
          </p>
        </div>

        <div className="preview-section">
          <PhoneNumber>0 157 123 45 67</PhoneNumber>
        </div>

        <div className="preview-section">
          <PhoneLink to="0 157 123 45 67">0 157 123 45 67</PhoneLink>
        </div>

        <div className="preview-section">
          <p><PopupLink to="https://google.com">Google</PopupLink></p>
          <p><PopupLink to="/">Local</PopupLink></p>
        </div>

        <div className="preview-section">
          <Autocomplete
            label="Autocomplete" name="autocomplete"
            placeholder="2, 140" options={this.state.suggestions}
            onInput={this.handleAutocomplete}
            error="Required between 2 and 140 chars" required
            renderContent={
              (contextList) => (
                <>
                  <header>Header</header>
                  {contextList}
                  <footer>Footer</footer>
                </>
              )
            }
          />
        </div>

        <div className="preview-section">
          <TagCloud
            label="Required tag cloud" name="tags_1"
            items={tags} error="Select at least one tag" required
          />
          <TagCloud
            label="Multiple selected validation" name="tags_2"
            items={tags} error="Select at least 3 tags"
            validate="isLength:3" multiple
            itemClassName="custom_item_css"
          />
        </div>

        <div className="preview-section">
          <TagsPicker
            multiple
            ref={this.getMergedRefFn()}
            items={uniq([...tags, ...this.state.extraItems])}
            onSelect={this.handleTagsPickerSelect}
            addMessage="plz add"
            errorMessage="Dammit, there's an error"
          />
        </div>

      </article>
    );
  }
}

export default Inputs;
