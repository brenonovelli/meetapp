import * as Yup from 'yup';

export default async (req, res, next) => {
  try {
    const schema = Yup.object().shape({
      date: Yup.date().required(),
      title: Yup.string().required(),
      description: Yup.string().required(),
      local: Yup.string().required(),
      banner: Yup.number(),
    });

    await schema.validate(req.body, { abortEarly: false });

    return next();
  } catch (err) {
    return res
      .status(400)
      .json({ error: 'Validation fails.', messages: err.inner });
  }
};
