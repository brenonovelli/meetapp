import { Op } from 'sequelize';
import User from '../models/User';
import File from '../models/File';
import Meetup from '../models/Meetup';
import Registration from '../models/Registration';
import Queue from '../../lib/Queue';
import RegistrationMail from '../jobs/RegistrationMail';

class RegistrationController {
  async index(req, res) {
    const registration = await Registration.findAll({
      where: {
        user_id: req.userId,
      },
      include: [
        {
          model: Meetup,
          where: {
            date: {
              [Op.gt]: new Date(),
            },
          },
          include: [
            {
              model: User,
              attributes: ['name'],
            },
            {
              model: File,
              as: 'cover',
              attributes: ['id', 'path', 'url'],
            },
          ],
        },
      ],
      order: [[Meetup, 'date']],
    });

    return res.json(registration);
  }

  async store(req, res) {
    const user = await User.findByPk(req.userId);
    const meetup = await Meetup.findByPk(req.params.meetupId, {
      include: [User],
    });

    if (!meetup) {
      return res.status(400).json({ error: 'Meetup not found.' });
    }

    if (meetup.user_id === req.userId) {
      return res
        .status(400)
        .json({ error: "Can't register to you own meetups" });
    }

    if (meetup.past) {
      return res.status(400).json({ error: "Can't register to past meetups" });
    }

    const checkDate = await Registration.findOne({
      where: {
        user_id: user.id,
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
      return res
        .status(400)
        .json({ error: "Can't register to two meetups at the same time" });
    }

    const registration = await Registration.create({
      user_id: user.id,
      meetup_id: meetup.id,
    });

    await Queue.add(RegistrationMail.key, {
      meetup,
      user,
    });

    return res.json(registration);
  }

  async delete(req, res) {
    const registration = await Registration.findByPk(req.params.id);
    /**
     * Get utils variable for verifications
     */
    const { user_id, past } = registration;
    /**
     * Check if is owner
     */
    if (!(user_id === req.userId)) {
      return res.status(401).json({
        error: "You don't have permission to cancel this registration.",
      });
    }
    /**
     * Check if is past meetup
     */
    if (past) {
      return res
        .status(400)
        .json({ error: 'Past registrations are not cancelables.' });
    }

    await registration.destroy();

    return res.json({ error: 'Registration cancelled.' });
  }
}

export default new RegistrationController();
