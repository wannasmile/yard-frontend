/* @flow */

import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

import { getImageUrl, media } from '../../utils';
import type { LocationType } from '../types';

const Card = styled(Link)`
  background-color: ${props => props.theme.white};
  border-bottom: solid 0.125rem ${props => props.theme.slateGrey};
  display: flex;
  flex-direction: column;
  margin-bottom: 2rem;
  text-decoration: none;
  overflow: hidden;
  ${media.tablet`
    flex-direction: row;
    margin-bottom: 3rem;
  `};

  &:last-child {
    margin-bottom: 4rem;
    ${media.tablet`
      margin-bottom: 6rem;
    `};
  }

  &:hover {
    transition: box-shadow 0.25s ease;
    will-change: box-shadow;
    box-shadow: 0 0 1.25rem rgba(0, 0, 0, 0.3);
  }
`;

const Image = styled.img`
  flex-shrink: 0;
  width: 100%;
  height: auto;
  object-fit: cover;
  ${media.tablet`
    width: 41%;
    max-height: 21.875rem;
  `};
`;

const Description = styled.div`
  box-sizing: border-box;
  display: flex;
  flex-flow: column;
  padding: 1rem 1rem 1.625rem;
  ${media.tablet`
    padding: 1.5rem 3rem 1.5rem 1rem;
  `};
  ${media.giant`
    padding-right: 6.25rem;
  `};
`;

const Location = styled.p`
  color: ${props => props.theme.slateGrey};
  font-family: ${props => props.theme.monaco};
  line-height: 1.25;
  margin: 0;
  text-transform: uppercase;
`;

const Name = styled.h3`
  color: ${props => props.theme.blackSecondary};
  font-size: 2rem;
  line-height: 1.25;
  margin: 1.5rem 0 0;
  ${media.tablet`
    font-size: 2.5rem;
    line-height: 1.4;
  `};
`;

const Info = styled.p`
  color: ${props => props.theme.charcoalGrey};
  line-height: 1.5;
  margin: 1rem 0 0;
  ${media.tablet`
    margin-top: 0.5rem 0 0;
  `};
`;

type Props = {
  slug: string,
  img: string,
  location: LocationType,
  name: string,
  children: typeof React.Element,
};

export default ({ slug, img, location, name, children }: Props) =>
  (<Card to={`/complexes/${slug}`}>
    <Image
      src={getImageUrl(img)}
      srcSet={`${getImageUrl(img, 1024)} 2x, ${getImageUrl(img, 2048)} 3x`}
      alt={name}
      title={name}
    />
    <Description>
      <Location>
        {location.subLocalityName && `${location.subLocalityName}, `}
        {location.street && `${location.street}, `}
        {location.house && `${location.house}`}
      </Location>
      <Name>
        {name}
      </Name>
      <Info>
        {children}
      </Info>
    </Description>
  </Card>);
