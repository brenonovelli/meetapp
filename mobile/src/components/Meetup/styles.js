import styled from 'styled-components/native';
import Button from '~/components/Button';

export const Container = styled.View`
  background: #fff;
  margin-bottom: 20px;
  border-radius: 10px;
  overflow: hidden;
`;
export const Cover = styled.Image.attrs({
  aspectRatio: 2,
  resizeMode: 'cover',
})``;
export const Info = styled.View`
  padding: 20px;
`;
export const Title = styled.TouchableOpacity``;
export const TitleText = styled.Text`
  font-size: 20px;
  color: #333;
  font-weight: bold;
`;

export const DetailIntro = styled.View`
  display: ${props => (props.opened ? 'flex' : 'none')};
  flex-direction: row;
`;
export const DetailIntroText = styled.Text`
  font-size: 14px;
  color: #666;
  margin-bottom: 15px;
  align-self: center;
`;
export const Details = styled.View`
  padding: 10px 0;
`;
export const Detail = styled.View`
  flex-direction: row;
`;
export const DetailText = styled.Text`
  font-size: 14px;
  color: #999;
  font-weight: 500;
  margin-bottom: 10px;
  margin-left: 5px;
  align-self: center;
`;

export const ButtonRegistration = styled(Button)`
  opacity: ${props => (props.disabled ? 0.6 : 1)};
  ${props => props.registered && 'background: rgba(221, 65, 81, 1);'};
`;
