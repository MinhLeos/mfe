import { mount } from 'marketingModule/MarketingApp';
import React from 'react';
import { useRef, useEffect } from 'react';

export default () => {
  const ref = useRef();

  useEffect(() => {
    mount(ref.current);
  });

  return <div ref={ref}></div>;
};
