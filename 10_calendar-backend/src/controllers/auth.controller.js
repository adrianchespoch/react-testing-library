import { User } from '../models/index.js';
import { genJWT } from '../helpers/index.js';

export const signUp = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    const user = new User({ name, email, password });
    await user.save();

    res
      .status(201)
      .json({ ok: true, msg: 'Usuario creado correctamente!', user });
  } catch (error) {
    console.log(error);
    res.status(500).json({ ok: false, msg: 'Talk to admin' });
  }
};

export const login = async (req, res) => {
  const { email } = req.body;

  const user = await User.findOne({ email });

  // Gen JWT
  const jwt = await genJWT(user.id);

  res
    .status(200)
    .json({ ok: true, msg: 'Successful login!', user, token: jwt });
};

export const renewJwt = async (req, res) => {
  const { authenticatedUser } = req;
  if (!authenticatedUser)
    res.status(401).json({ ok: false, msg: 'Unathorized!' });

  // Gen JWT
  const token = await genJWT(authenticatedUser.id);

  res.status(200).json({
    ok: true,
    token,
    user: {
      uid: authenticatedUser.id,
      name: authenticatedUser.name,
      email: authenticatedUser.email,
    },
  });
};
