import { useState } from 'react';

import Header from '../../components/header';
import MicroHelmet from '../../../lib/micro_helmet';

const Meta = () => {
  const [title, setTitle] = useState('Success Title');

  const handleInputChange = (event) => {
    setTitle(event.target.value);
  };

  let lastNode;
  if (title) {
    lastNode = <MicroHelmet title={title} />;
  }

  return (
    <article className="preview-meta">
      <Header>Meta</Header>
      <p>Check window title</p>

      <p>
        Try to change window title:
        <input className="ui-input" value={title} onChange={handleInputChange} />
      </p>

      <MicroHelmet title="Parent title" />
      <div>
        <MicroHelmet title="Children title" />
        {lastNode}
      </div>
    </article>
  );
};


export default Meta;
