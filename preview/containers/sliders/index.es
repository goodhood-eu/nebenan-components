import React, { PureComponent } from 'react';

import Header from '../../components/header';

import Accordion from '../../../lib/accordion';
import Slideshow from '../../../lib/slideshow';
import FadingSlideshow from '../../../lib/fading_slideshow';

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

  static renderSlide(slide, index) {
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

  static renderImage(image) {
    return (
      <span
        className="preview-sliders-slideshow-image"
        style={getBackgroundImageStyle(image.url)}
      />
    );
  }

  render() {
    const fadingSlideshowItems = content.images.map(this.constructor.renderImage);
    const slideshowItems = content.slides.map(this.constructor.renderSlide);

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
      </article>
    );
  }
}

export default Sliders;
