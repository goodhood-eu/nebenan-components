import { PureComponent } from 'react';
import { arrayOf } from 'nebenan-helpers/lib/data';
import { Link } from 'react-router-dom';

import Header from '../../components/header';

import Slideshow from '../../../lib/slideshow';
import FadingSlideshow from '../../../lib/fading_slideshow';
import Carousel from '../../../lib/carousel';
import Expandable from '../../../lib/expandable';
import ExpandableCard from '../../../lib/expandable_card';
import SideScroller from '../../../lib/side_scroller';
import TabScroller from '../../../lib/tab_scroller';

import content from '../../sample_data';

const getBackgroundImageStyle = (url) => ({ backgroundImage: `url("${url}")` });


class Sliders extends PureComponent {
  renderSlide(slide, index) {
    const body = (
      <>
        <header className="preview-sliders-slide-header">{slide.header}</header>
        <figure
          style={getBackgroundImageStyle(slide.image)}
          className="preview-sliders-slide-image"
        />
        <article className="preview-sliders-slide-content">{slide.content}</article>
      </>
    );

    if (index % 2) {
      return <Link key={index} className="preview-sliders-slide" to="/">{body}</Link>;
    }

    return <div key={index} className="preview-sliders-slide">{body}</div>;
  }

  renderImage(image) {
    return (
      <span
        key={image.url}
        className="preview-sliders-slideshow-image"
        style={getBackgroundImageStyle(image.url)}
      />
    );
  }

  renderBlock(item, index) {
    const isOdd = Boolean(index % 2);

    let text;
    if (isOdd) {
      text = <Link className="preview-sliders-side_scroller-block" to="/">{index}</Link>;
    } else {
      text = <span className="preview-sliders-side_scroller-block">{index}</span>;
    }

    return <li className="preview-sliders-side_scroller-item" key={index}>{text}</li>;
  }

  render() {
    const fadingSlideshowItems = content.images.map(this.renderImage);
    const slideshowItems = content.slides.map(this.renderSlide);
    const carouselItems = [];

    for (let i = 1; i <= 50; i += 1) {
      carouselItems.push((
        <div className="ui-card" key={i}>
          <div className="ui-card-section">{i}</div>
        </div>
      ));
    }

    const control = <span className="ui-link">Show stuff</span>;

    const longList = arrayOf(10).reduce((acc) => acc.concat(content.listArray), []);

    return (
      <article className="preview-sliders">
        <Header>Sliders</Header>

        <div className="preview-section">
          <TabScroller activeIndex={2} items={longList} />
        </div>

        <div className="preview-section">
          <TabScroller activeIndex={2} items={content.listArray} />
        </div>

        <div className="preview-section">
          <SideScroller>
            <img
              src="https://www.west-crete.com/images/panoramas/house-view.jpg"
              height="300px" alt=""
            />
          </SideScroller>
        </div>

        <div className="preview-section">
          <SideScroller>
            <ul className="preview-sliders-side_scroller-list">
              {arrayOf(50).map(this.renderBlock)}
            </ul>
          </SideScroller>
        </div>

        <div className="preview-section">
          <Slideshow items={slideshowItems} rotationInterval={1000 * 5} />
        </div>

        <div className="preview-section">
          <FadingSlideshow items={fadingSlideshowItems} rotationInterval={1000 * 5} />
        </div>

        <div className="preview-section">
          <Carousel>{carouselItems}</Carousel>
        </div>

        <div className="preview-section">
          <ExpandableCard title="whoopsiewoo">This is more stuff</ExpandableCard>
        </div>

        <div className="preview-section">
          <Expandable control={control}>This is more stuff</Expandable>
        </div>
      </article>
    );
  }
}

export default Sliders;
