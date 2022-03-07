import { useState, useEffect } from 'react';
import getStaticLink from 'common/static';

export interface ImagePropsTypes {
  src: string;
  alt: string;
  width?: number;
  height?: number;
}

export default function Image(
  props: ImagePropsTypes & React.HTMLAttributes<any>,
): JSX.Element {
  const { src: propsSrc, alt, ...defaultProps } = props;
  const [src, setSrc] = useState(propsSrc);

  useEffect(() => {
    if (src !== propsSrc) {
      setSrc(propsSrc);
    }
    if (!propsSrc) {
      setSrc('/images/no-image.svg');
    }
  }, [propsSrc]);

  const onError = () => {
    if (props.src) setSrc('/images/no-image.svg');
  };

  return (
    <img
      {...defaultProps}
      onError={() => {
        onError();
      }}
      loading="lazy"
      src={getStaticLink(src)}
      alt={alt}
    />
  );
}
