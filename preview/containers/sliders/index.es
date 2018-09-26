import React, { PureComponent } from 'react';

import Header from '../../components/header';

import Accordion from '../../../lib/accordion';
import Slideshow from '../../../lib/slideshow';
import FadingSlideshow from '../../../lib/fading_slideshow';
import Carousel from '../../../lib/carousel';
import Expandable from '../../../lib/expandable';
import ExpandableCard from '../../../lib/expandable_card';

import content from '../../sample_data';

const getBackgroundImageStyle = (url) => ({ backgroundImage: `url("${url}")` });


class Sliders extends PureComponent {
  constructor(props) {
    super(props);
    this.state = { accordionActiveIndex: 0 };
    this.handleAccordionChange = this.handleAccordionChange.bind(this);
  }

  handleAccordionChange(index) {
    this.setState({ accordionActiveIndex: index });
  }

  renderSlide(slide, index) {
    return (
      <div key={index} className="preview-sliders-slide">
        <header className="preview-sliders-slide-header">{slide.header}</header>
        <figure
          style={getBackgroundImageStyle(slide.image)}
          className="preview-sliders-slide-image"
        />
        <article className="preview-sliders-slide-content">{slide.content}</article>
      </div>
    );
  }

  renderImage(image) {
    return (
      <span
        className="preview-sliders-slideshow-image"
        style={getBackgroundImageStyle(image.url)}
      />
    );
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

    return (
      <article className="preview-sliders">
        <Header>Sliders</Header>

        <div className="preview-section">
          <Accordion
            items={content.content_array}
            activeIndex={this.state.accordionActiveIndex}
            onChange={this.handleAccordionChange}
          />
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
