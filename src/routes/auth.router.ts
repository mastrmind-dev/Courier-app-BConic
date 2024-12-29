import { Router } from 'express';
import formData from '../middlewares/formData';
import sanitize from '../middlewares/sanitize';
import { validationSchema } from '../middlewares/validateSchema';
import { login, signup } from '../lib/joi';
import { authController } from '../controllers/auth.controller';
import { isLoggedIn } from '../middlewares/auth';

const router = Router();

/**
 * @swagger
 * /api/v1/auth/sign-up:
 *   post:
 *     summary: Local Signup
 *     tags:
 *       - Auth Endpoints - Local
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *                 format: email
 *                 example: "user@example.com"
 *               password:
 *                 type: string
 *                 format: password
 *                 example: "password123"
 *               confirmPassword:
 *                 type: string
 *                 format: password
 *                 example: "password123"
 *               firstname:
 *                 type: string
 *                 example: "John"
 *               lastname:
 *                 type: string
 *                 example: "Doe"
 *               address:
 *                 type: string
 *                 example: "123 Main St, New York, NY 10030"
 *               contactNumber:
 *                 type: string
 *                 example: "+1234567890"
 *     responses:
 *       200:
 *         description: User created successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 data:
 *                   type: object
 *                   properties:
 *                     userId:
 *                       type: string
 *                 message:
 *                   type: string
 *       400:
 *         description: Password does not match
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *       409:
 *         description: User already exists
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *       500:
 *         description: Internal server error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 */
router.post('/sign-up', [formData, sanitize, validationSchema(signup)], authController.signup);

/**
 * @swagger
 * /api/v1/auth/login:
 *   post:
 *     summary: Local login
 *     tags:
 *       - Auth Endpoints - Local
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *                 format: email
 *                 example: "user@example.com"
 *               password:
 *                 type: string
 *                 format: password
 *                 example: "password123"
 *     responses:
 *       200:
 *         description: User logged successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 data:
 *                   type: object
 *                   properties:
 *                     userId:
 *                       type: string
 *                     token:
 *                       type: string
 *                 message:
 *                   type: string
 *       401:
 *         description: Password does not match
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *       404:
 *         description: User not found
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *       500:
 *         description: Internal server error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 */
router.post('/login', [formData, sanitize, validationSchema(login)], authController.login);

import { Request, Response } from 'express';

router.post('/test', [isLoggedIn], (req: Request, res: Response) => {
  res.send('Hello');
});

export default router;
