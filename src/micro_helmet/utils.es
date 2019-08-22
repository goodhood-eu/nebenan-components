const stringRegex = /%s/g;
const proxyProps = [
  'title',
  'description',
  'image',
  'robots',
  'canonical',
];

export const collectMetaProps = (acc, props) => ({ ...acc, ...props });

export const parseMetaProps = (metaProps) => {
  const { title, titleTemplate, defaultTitle } = metaProps;

  const result = proxyProps.reduce((acc, prop) => {
    if (metaProps[prop]) acc[prop] = metaProps[prop];
    return acc;
  }, {});

  if (title && titleTemplate) result.title = titleTemplate.replace(stringRegex, title);
  else if (!title && defaultTitle) result.title = defaultTitle;

  return result;
};
