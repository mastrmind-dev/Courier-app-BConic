import { Router } from 'express';
import { shipmentController } from '../controllers/shipment.controller';
import { shipment, shipmentTrack } from '../lib/joi';
import { isLoggedIn } from '../middlewares/auth';
import formData from '../middlewares/formData';
import sanitize from '../middlewares/sanitize';
import { validationSchema } from '../middlewares/validateSchema';

const router = Router();

/**
 * @swagger
 * /api/v1/shipment/create:
 *   post:
 *     summary: Shipment creation
 *     tags:
 *       - Shipment endpoints
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               recipientEmail:
 *                 type: string
 *                 format: email
 *                 example: "recipient@example.com"
 *               recipientName:
 *                 type: string
 *                 example: "Mark Stain"
 *               recipientAddress:
 *                 type: string
 *                 example: "123 Main St, Anytown, USA"
 *               recipientContactNumber:
 *                 type: string
 *                 example: "+1234567890"
 *               serviceType:
 *                 type: string
 *                 example: "Express"
 *               goodType:
 *                 type: string
 *                 example: "Documents"
 *               weight:
 *                 type: number
 *                 example: 1.5
 *               packagingType:
 *                 type: string
 *                 example: "Box"
 *               paymentMethod:
 *                 type: string
 *                 example: "Online"
 *     responses:
 *       200:
 *         description: Shipment created successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 data:
 *                   type: object
 *                   properties:
 *                     shipmentId:
 *                       type: string
 *                     recipientEmail:
 *                       type: string
 *                     recipientName:
 *                       type: string
 *                     recipientAddress:
 *                       type: string
 *                     recipientContactNumber:
 *                       type: string
 *                     serviceType:
 *                       type: string
 *                     goodType:
 *                       type: string
 *                     weight:
 *                       type: number
 *                     packagingType:
 *                       type: string
 *                     paymentMethod:
 *                       type: string
 *                 message:
 *                   type: string
 *       400:
 *         description: Bad request
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *       401:
 *         description: Unauthorized
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
router.post(
  '/create',
  [formData, sanitize, validationSchema(shipment), isLoggedIn],
  shipmentController.create
);

/**
 * @swagger
 * /api/v1/shipment/track/{shipmentId}:
 *   post:
 *     summary: Shipment tracking
 *     tags:
 *       - Shipment endpoints
 *     requestBody:
 *       required: false
 *     parameters:
 *       - in: path
 *         name: shipmentId
 *         required: true
 *         schema:
 *           type: string
 *           example: "202b18ee-e8f0-4151-8cfc-be456bc30f02"
 *         description: The tracking number of the shipment
 *     responses:
 *       200:
 *         description: Shipment tracked successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 data:
 *                   type: object
 *                   properties:
 *                     shipmentId:
 *                       type: string
 *                     trackingStatus:
 *                       type: string
 *                 message:
 *                   type: string
 *       401:
 *         description: Unauthorized
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *       404:
 *         description: Shipment not found
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
router.post(
  '/track/:shipmentId',
  [formData, sanitize, validationSchema(shipmentTrack), isLoggedIn],
  shipmentController.track
);

export default router;
