import styled from 'styled-components/native';

export const Container = styled.SafeAreaView`
  flex: 1;
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
