require('dotenv').config();

const express = require('express');
const utils = require('../../utils');
const router = express.Router();
const QRCode = require('qrcode')

router.get('/qr/website', async (req, res) => {
    const url = `http://localhost:${process.env.PORT}/`;

    try {
        const qrCodeBuffer = await QRCode.toBuffer(url);
        res.setHeader('Content-Type', 'image/png');
        res.send(qrCodeBuffer);
    } catch (err) {
        res.status(500).send('Error generating QR code');
    }
});

router.get('/qr/wifi', async (req, res) => {
    if (!process.env.SSID) {
        return res.status(400).send('SSID is required');
    }

    const wifiString = `WIFI:S:${process.env.SSID};T:WPA;P:${process.env.PASSWORD};;`;

    try {
        const qrCodeBuffer = await QRCode.toBuffer(wifiString);
        res.setHeader('Content-Type', 'image/png');
        res.send(qrCodeBuffer);
    } catch (err) {
        res.status(500).send('Error generating QR code');
    }
});

module.exports = router;