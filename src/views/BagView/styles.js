import styled from 'styled-components/native';

export const Container = styled.View``;

export const PageTitle = styled.Text`
    
`;

export const MedalContainer = styled.View`
    align-items: center;
`;

export const Medal = styled.ImageBackground.attrs({
        imageStyle: { borderRadius: 40 }
})`
    width: 80px;
    height: 80px;
    margin: 15px;
`;

export const MedalCover = styled.View`
    flex: 1;
    border-radius: 40px;
    background: ${props => props.hasMedal ? "rgba(200, 200, 200, 0.7)" : "rgba(0, 0, 0, 0)"} ;
`;