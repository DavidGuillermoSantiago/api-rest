import * as dotenv from 'dotenv';
dotenv.config();


// Cargar las dependencias necesarias jwt
import jwt from 'jsonwebtoken';


//Crea la constante SECRET con el valor de la variable de entorno SECRET
const SECRET = process.env.SECRET;


//Crea la variable que te ayudara con el tiempo de expiración del token
const EXPIRATION_TIME = 60 * 1000;;


//Crea la función que te ayudara a obtener el token
export const signToken = (id, sec) => {
   const payload = {
       id: id,
       exp: Date.now() + EXPIRATION_TIME
   }
   return jwt.sign(payload, sec);
}
//Crea la función que te ayudara a verificar el token
export const verifyToken = (token) => {
   return jwt.verify(token, SECRET);
}
//Crear la funcion para validar la expiración del  token
export const validateExpiration = (payload) => {
   if (Date.now() > payload.exp) {
       throw new Error("El token ha expirado");
   }
}
