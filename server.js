const express = require('express');
const nodemailer = require('nodemailer');
const cors = require('cors');

const app = express();

// Middleware
app.use(express.json());
app.use(cors({ origin: '*' }));

// Route de base pour vérifier le serveur
app.get('/', (req, res) => {
    res.send('Serveur en ligne 🚀');
});

// Route pour l'envoi d'email
app.post('/send-email', async (req, res) => {
    const { nom, email, telephone, poste, message } = req.body;

    if (!nom || !email || !telephone || !poste) {
        return res.status(400).json({ message: 'Tous les champs obligatoires doivent être remplis.' });
    }

    try {
        // Configuration du transporteur SMTP
        let transporter = nodemailer.createTransport({
            host: "ssl0.ovh.net",
            port: 465,
            secure: true,
            auth: {
                user: "cabinet@orthosto.com",
                pass: "Orthosto2025"
            }
        });

        // Contenu de l'email
        let mailOptions = {
            from: email,
            to: 'cabinet@orthosto.com',
            subject: `Nouvelle candidature - ${poste}`,
            html: `
                <h3>Nouvelle candidature</h3>
                <p><strong>Nom :</strong> ${nom}</p>
                <p><strong>Email :</strong> ${email}</p>
                <p><strong>Téléphone :</strong> ${telephone}</p>
                <p><strong>Poste :</strong> ${poste}</p>
                <p><strong>Message :</strong> ${message ? message : 'Aucun message fourni'}</p>
            `
        };

        // Envoi de l'email
        let info = await transporter.sendMail(mailOptions);
        console.log('Email envoyé :', info.response);

        res.status(200).json({ message: 'Votre candidature a bien été envoyée.' });
    } catch (error) {
        console.error('Erreur lors de l envoi de lemail :', error);
        res.status(500).json({ message: 'Erreur lors de l envoi du message.' });
    }
});

// Exporte l'application Express pour que Vercel puisse l'utiliser
module.exports = app;
