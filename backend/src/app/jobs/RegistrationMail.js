import { format, parseISO } from 'date-fns';
import pt from 'date-fns/locale/pt';
import Mail from '../../lib/Mail';

class RegistrationMail {
  get key() {
    return 'RegistrationMail';
  }

  async handle({ data }) {
    const { meetup, user } = data;

    await Mail.sendMail({
      // to: 'Nome <norpley@meetapp.com>',
      to: `${meetup.User.name} <${meetup.User.email}>`,
      subject: `Nova inscrição no MeetUp: ${meetup.title}`,
      template: 'registration',
      context: {
        user_name: user.name,
        meetup_name: meetup.title,
        meetup_date: format(
          parseISO(meetup.date),
          "'dia' dd 'de' MMMM', às' H:mm'h'",
          {
            locale: pt,
          }
        ),
        meetup_owner: meetup.User.name,
      },
    });
  }
}

export default new RegistrationMail();
