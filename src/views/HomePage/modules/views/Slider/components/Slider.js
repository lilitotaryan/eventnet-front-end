/** @jsx jsx */
import { useState, useEffect, useRef } from 'react';
import { css, jsx } from '@emotion/core';
import SliderContent from './SliderContent';
import Slide from './Slide';
import Dots from './Dots';

const getWidth = () => window.innerWidth;

/**
 * @function Slider
 */
const Slider = props => {
  const { slides } = props;

  const [state, setState] = useState({
    activeIndex: 0,
    translate: getWidth(),
    transition: 0.45,
    _slides: [...slides],
  });

  const { activeIndex, translate, transition } = state;
  const contentRef = useRef();
  const resizeRef = useRef();

  useEffect(() => {
    let timeout = setTimeout(() => {
      nextSlide();
    }, 3000);
    return () => clearTimeout(timeout);
  }, [activeIndex]);

  useEffect(() => {
    resizeRef.current = handleResize;
  });

  useEffect(() => {
    const resize = () => {
      handleResize();
    };

    const onResize = window.addEventListener('resize', resize);

    return () => {
      window.removeEventListener('resize', onResize);
    };
  }, []);

  useEffect(() => {
    if (transition === 0) setState({ ...state, transition: 0.45 });
  }, [transition]);

  const handleResize = () => {
    const translate = (activeIndex + 1) * getWidth();
    setState({ ...state, translate, transition: 0 });
  };

  const nextSlide = () => {
    const next = activeIndex === slides.length - 1 ? getWidth() : translate + getWidth();
    const isLastSlide = activeIndex === slides.length - 1;

    setState({
      ...state,
      activeIndex: isLastSlide ? 0 : activeIndex + 1,
      translate: next,
    });
  };

  return (
    <div css={SliderCSS}>
      <SliderContent
        ref={contentRef}
        translate={translate}
        transition={transition}
        width={getWidth() * slides.length}
      >
        {slides.map((_slide, i) => (
          <Slide width={getWidth()} key={_slide + i} content={_slide} images />
        ))}
      </SliderContent>
      <Dots slides={slides} activeIndex={activeIndex} />
    </div>
  );
};

const SliderCSS = css`
  position: relative;
  height: 80vh;
  width: 100vw;
  margin: 0 auto;
  overflow: hidden;
  white-space: nowrap;
`;

export default Slider;
