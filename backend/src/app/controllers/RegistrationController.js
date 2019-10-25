import { Op } from 'sequelize';
import User from '../models/User';
import File from '../models/File';
import Meetup from '../models/Meetup';
import Registration from '../models/Registration';

import CreateRegistrationService from '../services/CreateRegistrationService';

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
    const registration = await CreateRegistrationService.run({
      user_id: req.userId,
      meetup_id: req.params.meetupId,
    });
    return res.json(registration);
  }

  async delete(req, res) {
    const registration = await Registration.findByPk(req.params.id);

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
