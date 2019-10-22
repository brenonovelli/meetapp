import { Op } from 'sequelize';
import { parseISO, startOfDay, endOfDay } from 'date-fns';
import Meetup from '../models/Meetup';
import User from '../models/User';

class OrganizationController {
  async index(req, res) {
    const where = { user_id: req.userId };
    const page = req.query.page || 1; // O valor passado ou 1

    // Checando se foi a data foi passada
    if (req.query.date) {
      const searchDate = parseISO(req.query.date);
      // Jogando a data dentro do where
      where.date = {
        [Op.between]: [startOfDay(searchDate), endOfDay(searchDate)],
      };
    }

    // Buscando os meetups a listar
    const meetup = await Meetup.findAll({
      where,
      include: [
        {
          model: User,
          attributes: ['name', 'email'],
        },
      ],
      order: ['date'],
      limit: 10,
      offset: 10 * page - 10,
    });

    return res.json(meetup);
  }
}

export default new OrganizationController();
