import User from '../models/User';

import Meetup from '../models/Meetup';
import Registration from '../models/Registration';

class SubscribersController {
  async index(req, res) {
    const meetup = await Meetup.findByPk(req.params.meetupId);
    const { id, user_id } = meetup;
    if (!(user_id === req.userId)) {
      return res
        .status(401)
        .json({ error: "You don't have permission to view access meetup." });
    }

    const subscribers = await Registration.findAll({
      where: {
        meetup_id: id,
      },
      include: [
        {
          model: User,
          attributes: ['name'],
        },
      ],
      order: [[User, 'name']],
    });

    return res.json(subscribers);
  }
}

export default new SubscribersController();
