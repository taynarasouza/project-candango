import React from 'react';
import ProgressCircle from 'react-native-progress-circle';
import PropTypes from 'prop-types';

import { Avatar, Container } from './styles';

export const ProfileXp = ({ percent, size, imageUrl }) => {
  return (
    <Container>
        <ProgressCircle
            percent={percent}
            radius={size}
            borderWidth={size/6}
            color="#000099"
            shadowColor="#EEE"
            bgColor="#fff"
        >
            <Avatar source={{ uri: imageUrl }} />
        </ProgressCircle>
    </Container>
  );
}

ProfileXp.propTypes = {
    percent: PropTypes.number.isRequired,
    size: PropTypes.number,
    imageUrl: PropTypes.string.isRequired,
};

ProfileXp.defaultProps = {
    percent: 0,
    size: 50,
    imageUrl: "",
};
