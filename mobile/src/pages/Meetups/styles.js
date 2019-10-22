import styled from 'styled-components/native';

export const Container = styled.SafeAreaView`
  flex: 1;
`;

export const Nav = styled.View`
  flex-direction: row;
  align-items: center;
  justify-content: center;
  margin: 0 0 30px;
`;
export const ButtonHandleDate = styled.TouchableOpacity``;

export const SelectedDate = styled.Text`
  font-size: 20px;
  font-weight: 800;
  color: #fff;
  margin: 0 20px;
`;

export const MeetupList = styled.FlatList.attrs({
  showsVerticalScrollIndicator: false,
})`
  padding: 0 20px 50px;
`;

export const NoMeetups = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
`;
export const NoMeetupsTxt = styled.Text`
  font-size: 14px;
  color: #fff;
`;
