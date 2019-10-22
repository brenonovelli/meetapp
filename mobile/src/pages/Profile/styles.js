import styled from 'styled-components/native';
import Input from '~/components/Input';
import Button from '~/components/Button';

export const Container = styled.SafeAreaView`
  flex: 1;
`;

export const Separator = styled.View`
  height: 1px;
  background: rgba(255, 255, 255, 0.2);
  margin: 0 0 30px;
`;
export const Form = styled.ScrollView.attrs({
  showsVerticalScrollIndicator: false,
})`
  align-self: stretch;
  padding: 0 20px;
`;
export const FormInput = styled(Input)`
  margin-bottom: 10px;
`;
export const SubmitButton = styled(Button)`
  margin-bottom: 20px;
`;
export const LogoutButton = styled(Button)`
  background: rgba(221, 65, 81, 1);
`;
