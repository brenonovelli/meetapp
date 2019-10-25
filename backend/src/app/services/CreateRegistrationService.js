import User from '../models/User';
import Meetup from '../models/Meetup';
import Registration from '../models/Registration';

import Queue from '../../lib/Queue';
import RegistrationMail from '../jobs/RegistrationMail';

class CreateRegistrationService {
  async run({ user_id, meetup_id }) {
    const user = await User.findByPk(user_id);
    const meetup = await Meetup.findByPk(meetup_id, {
      include: [User],
    });

    if (!meetup) {
      throw new Error('Meetup not found.');
    }

    if (meetup.user_id === user_id) {
      throw new Error("Can't register to you own meetups");
    }

    if (meetup.past) {
      throw new Error("Can't register to past meetups");
    }

    const checkDate = await Registration.findOne({
      where: {
        user_id,
      },
      include: [
        {
          model: Meetup,
          required: true,
          where: {
            date: meetup.date,
          },
        },
      ],
    });

    if (checkDate) {
      throw new Error("Can't register to two meetups at the same time.");
    }

    const registration = await Registration.create({
      user_id,
      meetup_id: meetup.id,
    });

    await Queue.add(RegistrationMail.key, {
      meetup,
      user,
    });

    return registration;
  }
}

export default new CreateRegistrationService();
