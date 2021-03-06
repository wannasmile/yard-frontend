/* @flow */

import React, { Component } from 'react';
import { Grid } from 'react-flexbox-grid';
import Modal from 'react-modal';
import styled from 'styled-components';

import { getImageUrl } from '../../utils';
import Pluralizer from '../../components/Pluralizer';
import Carousel from './Carousel';
import type { ImagesType } from '../types';

const Images = styled.div`
  display: flex;
  justify-content: flex-start;
  overflow: scroll;
  position: relative;
`;

const Image = styled.img`
  cursor: pointer;
  max-height: 25rem;

  &:hover {
    transition: opacity 0.25s ease;
    will-change: opacity;
    opacity: 0.9;
  }
`;

const Button = styled.button`
  background-color: ${props => props.theme.ocean};
  border: none;
  color: ${props => props.theme.white};
  cursor: pointer;
  display: block;
  font-family: ${props => props.theme.fira};
  font-size: 0.625rem;
  font-weight: 300;
  line-height: 1;
  margin-top: -2.625rem;
  padding: 0.5rem 1rem;
  position: absolute;

  &:focus {
    outline: none;
  }

  &:hover {
    transition: opacity 0.25s ease;
    will-change: opacity;
    opacity: 0.9;
  }
`;

const modalStyles = {
  overlay: {
    backgroundColor: 'rgba(17, 17, 17, 0.95)',
  },
  content: {
    background: 'none',
    border: 'none',
    borderRadius: 'none',
    position: 'fixed',
    top: 0,
    left: 0,
    bottom: 0,
    right: 0,
    margin: 0,
    padding: 0,
    textAlign: 'center',
    overflow: 'hidden',
  },
};

type Props = {
  images: ImagesType,
  name: string,
};
type State = {
  modalIsOpen: boolean,
  selected: number,
};

export default class Gallery extends Component<void, Props, State> {
  state = {
    modalIsOpen: false,
    selected: 0,
  };

  openModal = (i: number = 0) => (e: KeyboardEvent) => {
    e.stopPropagation();
    this.setState({ modalIsOpen: true, selected: i });
  };

  closeModal = () => {
    this.setState({ modalIsOpen: false, selected: 0 });
  };

  render() {
    const { images, name } = this.props;
    const imagesCount: number = images.length;

    return (
      <div>
        <Images>
          {images.map((image, i) =>
            (<Image
              key={image.id}
              src={getImageUrl(image.id)}
              srcSet={`${getImageUrl(image.id, 1024)} 2x, ${getImageUrl(image.id, 2048)} 3x`}
              alt={`Фотография ${i + 1}/${imagesCount} ЖК ${name}`}
              title={`Фотография ${i + 1}/${imagesCount} ЖК ${name}`}
              onClick={this.openModal(i)}
            />),
          )}
        </Images>
        <Grid fluid>
          <div>
            <Button onClick={this.openModal(0)}>
              {imagesCount}{' '}
              <Pluralizer
                numeral={imagesCount}
                one="фотография"
                few="фотографии"
                other="фотографий"
              />
            </Button>
          </div>
        </Grid>
        <Modal
          isOpen={this.state.modalIsOpen}
          onRequestClose={this.closeModal}
          style={modalStyles}
          contentLabel={''}
        >
          <Carousel
            closeModal={this.closeModal}
            images={images}
            name={name}
            active={this.state.selected}
            gutter={'5vw'}
            scaleRatio={1.2}
          />
        </Modal>
      </div>
    );
  }
}
