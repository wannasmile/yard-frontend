import React from 'react';
import styled from 'styled-components';
import { Grid, Row, Col } from 'react-flexbox-grid';
import Hr from './Hr';

const Directions = styled.section`
  background-color: #fff;
`;

const MapImage = styled.img`
  box-shadow: 0 0 30px 0 rgba(0, 0, 0, 0.5);
  height: 306px;
  margin-bottom: 4rem;
  margin-top: -130px;
  width: 100%;
`;

const Wrapper = styled.div`
  background-color: #fff;
  box-shadow: 0 0 30px 0 rgba(0, 0, 0, 0.5);
  margin-bottom: 4rem;
  margin-top: -130px;
`;

const Direction = styled.div`
  padding: 1.5rem 1.5rem 1.5625rem 1.5rem;
`;

const Title = styled.p`
  color: #3e4247;
  font-weight: 500;
  line-height: 1.375;
  margin-bottom: 0.5rem;
  margin-top: 0;
`;

const Distance = styled.p`
  color: #a9afb6;
  line-height: 1.375;
  margin: 0;
`;

export default () => (
  <Directions>
    <Grid>
      <Row>
        <Col lg={6}>
          <MapImage
            src={`${process.env.PUBLIC_URL}/img/map.png`}
            alt="Якиманка"
            title="Якиманка"
          />
        </Col>
        <Col lg={6}>
          <Wrapper>
            <Direction>
              <Title>Красный Октябрь</Title>
              <Distance>24 минуты, 6 км</Distance>
            </Direction>
            <Hr />
            <Direction>
              <Title>World class</Title>
              <Distance>2 минуты, 300 м</Distance>
            </Direction>
            <Hr />
            <Direction>
              <Title>Третьяковская галерея</Title>
              <Distance>14 минут, 4 км</Distance>
            </Direction>
            <Hr />
          </Wrapper>
        </Col>
      </Row>
    </Grid>
  </Directions>
);