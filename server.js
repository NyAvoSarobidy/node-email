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

// Gestion de la requête OPTIONS (pré-vol)
app.options('/send-email', (req, res) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'POST, OPTIONS');
    res.header('Access-Control-Allow-Headers', 'Content-Type');
    res.status(200).send();
});

// Route pour l'envoi d'email
app.post('/send-email', async (req, res) => {


    res.header('Access-Control-Allow-Origin', '*'); // Autorise toutes les origines
    res.header('Access-Control-Allow-Methods', 'POST'); // Autorise la méthode POST
    res.header('Access-Control-Allow-Headers', 'Content-Type'); // Autorise l'en-tête Content-Type

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

// Gestion de la requête OPTIONS (pré-vol)
app.options('/Enquette', (req, res) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'POST, OPTIONS');
    res.header('Access-Control-Allow-Headers', 'Content-Type');
    res.status(200).send();
});


app.post('/Enquette', async (req, res) => {
    // Ajouter les en-têtes CORS
    res.header('Access-Control-Allow-Origin', '*'); // Autorise toutes les origines
    res.header('Access-Control-Allow-Methods', 'POST'); // Autorise la méthode POST
    res.header('Access-Control-Allow-Headers', 'Content-Type'); // Autorise l'en-tête Content-Type

    const { date, Choix, Raison, Cabinet, Accueil, Recommandation, Commentaires } = req.body;

    if (!date || !Choix || !Raison || !Cabinet || !Accueil || !Recommandation) {
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

        let mailOptions = {
            from: 'no-reply@orthosto.com', // ou une adresse email fixe
            to: 'cabinet@orthosto.com',
            subject: 'ENQUETE DE SATISFACTION',
            html: `
                <h3>Nouvelle enquête de satisfaction</h3>
                <p><strong>Date :</strong> ${date}</p>
                
                <h4>1. Pourquoi avez-vous choisi notre cabinet dentaire ?</h4>
                <p><strong>Choix :</strong></p>
                <ul>
                    ${Choix.map(option => `<li>${option}</li>`).join('')}
                </ul>
                
                <div>
                    <strong>La raison la plus importante :</strong>
                    <p>${Raison}</p>
                </div>
        
                <h4>2. Comment avez-vous connu notre cabinet dentaire ?</h4>
                <p><strong>Sources :</strong></p>
                <ul>
                    ${Cabinet.map(option => `<li>${option}</li>`).join('')}
                </ul>
        
                <h4>3. Comment avez-vous trouvé l'accueil téléphonique ?</h4>
                <p><strong>Accueil :</strong> ${Accueil}</p>
        
                <h4>4. Recommanderiez-vous notre cabinet ?</h4>
                <p><strong>Recommandation :</strong> ${Recommandation}</p>
        
                <div>
                    <strong>Commentaires :</strong>
                    <p>${Commentaires}</p>
                </div>
            `
        };

        // Envoi de l'email
        let info = await transporter.sendMail(mailOptions);
        console.log('Email envoyé :', info.response);

        res.status(200).json({ message: 'Votre enquête a bien été envoyée.' });
    } catch (error) {
        console.error('Erreur lors de l envoi de lemail :', error);
        res.status(500).json({ message: 'Erreur lors de l envoi du message.' });
    }
});

app.options('/contact', (req, res) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'POST, OPTIONS');
    res.header('Access-Control-Allow-Headers', 'Content-Type');
    res.status(200).send();
});

app.post('/contact', async (req, res) => {
    // Ajouter les en-têtes CORS
    res.header('Access-Control-Allow-Origin', '*'); // Autorise toutes les origines
    res.header('Access-Control-Allow-Methods', 'POST'); // Autorise la méthode POST
    res.header('Access-Control-Allow-Headers', 'Content-Type'); // Autorise l'en-tête Content-Type

    const { nom, prenom, email, telephone, message } = req.body;

    // Validation des champs obligatoires
    if (!nom || !prenom || !email || !telephone || !message) {
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
            from: 'no-reply@orthosto.com', // ou une adresse email fixe
            to: 'cabinet@orthosto.com',
            subject: 'NOUVEAU MESSAGE DE CONTACT',
            html: `
                <h3>Nouveau message de contact</h3>
                <p><strong>Nom :</strong> ${nom}</p>
                <p><strong>Prénom :</strong> ${prenom}</p>
                <p><strong>Email :</strong> ${email}</p>
                <p><strong>Téléphone :</strong> ${telephone}</p>
                <p><strong>Message :</strong> ${message}</p>
            `
        };

        // Envoi de l'email
        let info = await transporter.sendMail(mailOptions);
        console.log('Email envoyé :', info.response);

        res.status(200).json({ message: 'Votre message a bien été envoyé.' });
    } catch (error) {
        console.error('Erreur lors de l\'envoi de l\'email :', error);
        res.status(500).json({ message: 'Erreur lors de l\'envoi du message.' });
    }
});

// Exporte l'application Express pour que Vercel puisse l'utiliser
module.exports = app;
