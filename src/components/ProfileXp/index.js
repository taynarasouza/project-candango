import React from 'react';
import ProgressCircle from 'react-native-progress-circle';

import { Avatar, Container } from './styles';

export const ProfileXp = ({ percent, size, image, style }) => {
  return (
    <Container style={style}>
        <Avatar source={image} />
    </Container>
  );
}