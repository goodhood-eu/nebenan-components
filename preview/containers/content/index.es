import React, { PureComponent } from 'react';
import { emojiCollection } from 'emojitsu';

import Header from '../../components/header';

import Tooltip from '../../../lib/tooltip';
import ClickSelect from '../../../lib/click_select';
import ContentHeader from '../../../lib/content_header';
import EmailLink from '../../../lib/email_link';
import PopupLink from '../../../lib/popup_link';
import Emoji from '../../../lib/emoji';
import EmojiSuggestions from '../../../lib/emoji_suggestions';
import TabBar from '../../../lib/tab_bar';
import FlatTabBar from '../../../lib/flat_tab_bar';
import LinkHeader from '../../../lib/link_header';
import Progress from '../../../lib/progress';
import PhoneNumber from '../../../lib/phone_number';


import content from '../../sample_data';

const emoji = 'Hello 👩🏿😎🙈🏳️‍🌈👨‍👨‍👧‍👦';
const suggestions = emojiCollection
  .filter(({ suggest, category }) => (suggest && category === 'people'))
  .map(({ shortname }) => shortname);

suggestions.length = 20;

const headerAction = (
  <span className="ui-button ui-button-small ui-button-primary">Button</span>
);

const action = 'x';


class Inputs extends PureComponent {
  static handleSelect(key, list) {
    console.warn('Selected emoji:', list[key]);
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
          <EmojiSuggestions
            className="ui-card" options={suggestions} onSelect={this.constructor.handleSelect}
          />
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

        <div className="preview-section preview-tooltips">
          <ul>
            <li>
              <div><Tooltip text={content.tooltip}>Tooltip top</Tooltip></div>
              <div><Tooltip type="bottom" text={content.tooltip}>Tooltip bottom</Tooltip></div>
            </li>
            <li>
              <div><Tooltip type="left" text={content.tooltip}>Tooltip left</Tooltip></div>
              <div><Tooltip type="right" text={content.tooltip}>Tooltip right</Tooltip></div>
            </li>
          </ul>
        </div>

        <div className="preview-section">
          <ClickSelect className="ui-input">{content.lorem}</ClickSelect>
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
          <p><PopupLink to="https://google.com">Google</PopupLink></p>
          <p><PopupLink to="/">Local</PopupLink></p>
        </div>

      </article>
    );
  }
}

export default Inputs;
