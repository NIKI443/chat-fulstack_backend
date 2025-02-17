import { body } from "express-validator";

export const registerValidation = [
	body('email', 'Неверный формат почты').isEmail(),
	body('password', 'Пароль должен быть от 5 до 50 символов').isLength(
		{ min: 5 },
		{ max: 50 }
	),
	body('name', 'Укажите имя').isLength({ min: 3 }),
	body('UserID', 'Укажите ID').isLength({ min: 3 }),
	body('surname', 'Укажите фамилию').optional().isLength({ min: 3 }),
	body('avatarUrl', 'Неверная ссылка на аватарку').optional().isURL(),
]

export const loginValidation = [
  body("email", "Неверный формат почты").isEmail(),
  body("password", "Пароль должен быть от 5 до 50 символов").isLength(
    { min: 5 },
    { max: 50 }
  ),
];

export const messageValidation = [body("text").optional().isString()];
