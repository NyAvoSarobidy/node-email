const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const nodemailer = require('nodemailer');
require('dotenv').config();

const app = express();

// 🔹 Active CORS pour toutes les origines
app.use(cors({ origin: '*' }));

// 🔹 Parse les requêtes JSON
app.use(bodyParser.json());

// ✅ Vérifier que le backend fonctionne
app.get('/', (req, res) => {
    res.send('Serveur en ligne 🚀');
});

// 📩 Route pour envoyer un email
app.post('/send-email', async (req, res) => {
    try {
        const { nom, email, telephone, poste, message } = req.body;

        const transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: process.env.EMAIL_USER,
                pass: process.env.EMAIL_PASS,
            },
        });

        const mailOptions = {
            from: process.env.EMAIL_USER,
            to: 'destinataire@example.com', // Remplace par ton adresse
            subject: `Message de ${nom} - ${poste}`,
            text: `Nom: ${nom}\nEmail: ${email}\nTéléphone: ${telephone}\nMessage: ${message}`,
        };

        await transporter.sendMail(mailOptions);
        res.status(200).json({ message: 'Email envoyé avec succès !' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Erreur lors de l’envoi du message.' });
    }
});

// 🛑 Gérer les routes inexistantes
app.use((req, res) => {
    res.status(404).json({ message: 'Route non trouvée' });
});

// 🚀 Lancer le serveur sur le bon port
const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
    console.log(`Serveur démarré sur http://localhost:${PORT}`);
});
