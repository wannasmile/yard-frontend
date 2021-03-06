/* @flow */

import React, { Component } from 'react';
import styled from 'styled-components';

import { getImageUrl } from '../../utils';
import type { ImagesType } from '../types';

const Wrapper = styled.div`
  padding-bottom: calc(0.8125 * ${props => props.gutter});
  padding-top: ${props => props.gutter};
  position: fixed;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  margin: 0;
`;

const Images = styled.div`
  display: flex;
  align-items: flex-end;
  justify-content: flex-start;
  overflow: hidden;
  max-width: 100vw;
  position: absolute;
  top: 50%;
  will-change: transform;
  transform: translate(0, -50%);

  @media (min-width: 64rem) {
    position: relative;
    top: auto;
    will-change: auto;
    transform: none;
  }
`;

const Image = styled.img`
  cursor: pointer;
  max-height: 100vh;
  max-width: 80%;
  transition: transform 0.25s ease-out;
  will-change: transform, opacity;
  transform: ${props => props.transform};
  transform-origin: center bottom;
  opacity: ${props => props.opacity};

  @media (min-width: 64rem) {
    max-height: calc(
      100vh - ${props => props.gutter} - 0.8125 * ${props => props.gutter} - 2.875rem
    );
  }
`;

const Description = styled.div`
  color: ${props => props.theme.hueGrey};
  display: inline-block;
  font-weight: 300;
  line-height: 1.375;
  position: absolute;
  bottom: 1.5rem;
  left: 50%;
  padding: 0.125rem 0.25rem;
  will-change: transform, text-shadow;
  transform: translate(-50%, 0);
  text-shadow: 1px 1px 2px rgba(17, 17, 17, 0.9);
  background: rgba(17, 17, 17, 0.5);

  @media (min-width: 64rem) {
    margin-top: 1.5rem;
    position: relative;
    bottom: auto;
    left: auto;
    padding: 0;
    will-change: auto;
    transform: none;
    text-shadow: none;
    background: none;
  }
`;

const Close = styled.div`
  position: absolute;
  right: 0;
  top: 0;
  width: 1.125rem;
  height: 1.125rem;
  padding: 1rem;
  cursor: pointer;
  z-index: 10;

  &:hover {
    transition: transform 0.25s ease;
    will-change: transform;
    transform: scale(1.2);
  }

  &::before,
  &::after {
    position: absolute;
    left: 1.5rem;
    content: ' ';
    height: 1.5rem;
    width: 1px;
    background-color: ${props => props.theme.white};
  }

  &::before {
    will-change: transform;
    transform: rotate(45deg);
  }

  &::after {
    will-change: transform;
    transform: rotate(-45deg);
  }

  @media (min-width: 64rem) {
    display: none;
  }
`;

function getTransform(i: number, active: number, scaleRatio: number, gutter: string): string {
  const activeShiftX: string = `50vw - 50% - ${active * 100}%`;

  if (i === active) {
    return `translateX(calc(${activeShiftX}))`;
  }
  return `translateX(calc(${activeShiftX} + ${i - active} * ${gutter})) scaleY(${1 / scaleRatio})`;
}

type Props = {
  closeModal: () => void,
  images: ImagesType,
  name: string,
  active: number,
  gutter: string,
  scaleRatio: number,
};
type State = { active: number };

export default class Carousel extends Component<void, Props, State> {
  state = { active: this.props.active };

  componentDidMount() {
    document.addEventListener('keydown', this.handleKeyDown);
  }

  componentWillUnmount() {
    document.removeEventListener('keydown', this.handleKeyDown);
  }

  setActive = (i: number) => {
    const imagesCount: number = this.props.images.length;

    if (i < 0) this.setState({ active: imagesCount - 1 });
    else if (i >= imagesCount) this.setState({ active: 0 });
    else this.setState({ active: i });
  };

  handleClick = (i: number) => (e: KeyboardEvent) => {
    e.stopPropagation();
    this.setActive(i === this.state.active ? i + 1 : i);
  };

  handleKeyDown = (e: KeyboardEvent) => {
    e.stopPropagation();
    if (e.key === 'ArrowLeft') this.setActive(this.state.active - 1);
    if (e.key === 'ArrowRight') this.setActive(this.state.active + 1);
  };

  render() {
    const { active } = this.state;
    const { closeModal, images, name, gutter = '5vw', scaleRatio = 1.2 } = this.props;
    const imagesCount: number = images.length;

    return (
      <Wrapper gutter={gutter} onClick={closeModal}>
        <Close onClick={closeModal} />
        <Images>
          {images.map((image, i) =>
            (<Image
              key={image.id}
              src={getImageUrl(image.id)}
              srcSet={`${getImageUrl(image.id, 1024)} 2x, ${getImageUrl(image.id, 2048)} 3x`}
              alt={`Фотография ${i + 1}/${imagesCount} ЖК ${name}`}
              title={`Фотография ${i + 1}/${imagesCount} ЖК ${name}`}
              gutter={gutter}
              transform={getTransform(i, active, scaleRatio, gutter)}
              opacity={i === active ? 1.0 : 0.5}
              onClick={this.handleClick(i)}
            />),
          )}
        </Images>
        <Description>
          {active + 1}/{imagesCount} {name}
        </Description>
      </Wrapper>
    );
  }
}
