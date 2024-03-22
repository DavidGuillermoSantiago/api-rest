//Importar modelo de datos
import User from "../models/User";

import * as dotenv from "dotenv";
import { signToken } from "../../utils";
import Role from "../models/Role";

import jwt from 'jsonwebtoken';

dotenv.config();

const SECRET = process.env.SECRET;

//Exportar las funciones de signUp y signIn
export const signUp = async (req, res) => {
  const { username, email, password, roles } = req.body;

  const newUser = new User({
    username,
    email,
    password: await User.encryptPassword(password),
  });

  //Condicional para asignar roles, en caso de que no se envíen roles,
  //se asigna el rol de usuario

  if(req.body.roles) {
    const foundRoles = await Role.find({ name: { $in: roles } });
    newUser.roles = foundRoles.map(role => role.id);
  } else {
    const role = await Role.findOne({ name: 'user' });
    newUser.roles = [role._id];
  }

  //Guardar el usuario en la base de datos
  const saveUser = await newUser.save();

  const token = signToken(saveUser._id, SECRET);

  console.log(saveUser);

  res.send({ token });
};

export const signIn = async (req, res) => {
    //Buscar usuario por correo
    const userFound = await User.findOne({ email: req.body.email }).populate('roles');
    //Si no se encuentra el usuario, enviar mensaje de error
    if(!userFound) return res.status(400).json({ message: 'Usuario no encontrado' });
    
    //Verificar contraseña
    const matchPassword = await User.comparePassword(req.body.password, userFound.password);
    //Si la contraseña no coincide, enviar mensaje de error
    if (!matchPassword) return res.status(401).json({ token: null, message: 'Contraseña inválida' });
    
    //Generar token
    const token = jwt.sign({ id: userFound._id }, process.env.SECRET, {expiresIn:86400});


    //Mostrar usuario encontrado
    console.log(userFound);

    //Enviar estatus y el token en la respuesta
    res.status(200).json({ token });

};
