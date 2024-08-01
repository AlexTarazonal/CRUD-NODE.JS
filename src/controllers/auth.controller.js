import User from '../models/user.models.js';
import bcrypt from 'bcryptjs';
import { createAccessToken } from '../libs/jwt.js';

export const register = async (req, res) => {
  const { email, password, username } = req.body;
  try {
    const passwordHash = await bcrypt.hash(password, 10);

    const newUser = await User.create({
      username,
      email,
      password: passwordHash,
    });

    const token = await createAccessToken({ id: newUser.id });

    res.cookie('token', token);

    res.json({
      id: newUser.id,
      username: newUser.username,
      email: newUser.email,
      createdAt: newUser.createdAt,
      updatedAt: newUser.updatedAt,
    });

  } catch (error) {
    console.error('Error during registration:', error);

    if (error.name === 'SequelizeValidationError') {
      return res.status(400).json({
        message: 'Validation error',
        errors: error.errors.map(e => ({
          field: e.path,
          message: e.message
        }))
      });
    }

    res.status(500).json({
      message: 'Server error',
      error: error.message,
    });
  }
};

export const login = async (req, res) => {
    const { email, password } = req.body;
    
    if (!email || !password) {
      return res.status(400).json({ message: 'Faltan credenciales' });
    }
  
    try {
      const userFound = await User.findOne({ where: { email } });
      if (!userFound) return res.status(400).json({ message: 'Usuario no encontrado' });
  
      const isMatch = await bcrypt.compare(password, userFound.password);
      if (!isMatch) return res.status(400).json({ message: 'Contraseña incorrecta' });
  
      const token = await createAccessToken({ id: userFound.id });
  
      res.cookie('token', token);
  
      res.json({
        id: userFound.id,
        username: userFound.username,
        email: userFound.email,
        createdAt: userFound.createdAt,
        updatedAt: userFound.updatedAt,
      });
  
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
};

export const logout = (req, res) => {
    res.cookie('token', "",{
        expires: new Date(0)
    })
    return res.sendStatus(200);
};


export const profile = (req, res ) => {
  res.send('profile')
}
  
