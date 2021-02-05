import User from '../models/UserModel.js';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

const generateToken = id => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: '30d',
  });
};

export const registerUser = async (req, res) => {
  const { email, password, confirmPassword } = req.body;

  const userExist = await User.findOne({ email });

  if (userExist) {
    return res
      .status(400)
      .json({ message: 'Такой пользователь уже существует' });
  }
  if (password !== confirmPassword) {
    return res.status(400).json({ message: 'Пароли не совпадают' });
  }
  const hashPassword = await bcrypt.hash(password, 5);
  const user = await User.create({
    email,
    password: hashPassword,
  });

  if (user) {
    res.status(201).json({
      _id: user._id,
      email: user.email,
      token: generateToken(user._id),
    });
  } else {
    res.status(400).json({
      message: 'Некорректные данные при входе в систему',
    });
  }
};

export const loginUser = async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email });

  if (user) {
    let comparePassword = bcrypt.compareSync(password, user.password);
    if (!comparePassword) {
      return res
        .status(400)
        .json({ message: 'Неверный пароль, попробуйте снова' });
    }
    res.json({
      _id: user._id,
      name: user.name,
      email: user.email,
      token: generateToken(user._id),
    });
  } else {
    return res.status(400).json({
      message: 'Некорректные данные при входе в систему',
    });
  }
};

export const getUser = async (req, res) => {
  const user = await User.findById(req.user._id);

  if (user) {
    res.json({
      _id: user._id,
      name: user.name,
      email: user.email,
      images: user.images,
    });
  } else {
    res.status(404).json('Пользователь не найден');
  }
};

export const getPhotos = async (req, res) => {
  const user = await User.findById(req.user._id);

  if (user) {
    res.json({
      _id: user._id,
      name: user.name,
      email: user.email,
      images: user.images,
    });
  } else {
    res.status(404).json({ message: 'ошибка' });
  }
};
