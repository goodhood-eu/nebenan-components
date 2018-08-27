import React from 'react';

import Header from '../../components/header';
import MicroHelmet from '../../../lib/micro_helmet';

const Meta = () => (
  <article className="preview-markdown">
    <Header>Meta</Header>
    <p>Check window title</p>
    <MicroHelmet title="TEST SUCCESSFUL!!!" />
  </article>
);


export default Meta;
