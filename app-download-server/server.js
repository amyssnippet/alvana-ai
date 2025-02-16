const express = require('express');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 4000;
const APK_FILE = './alvana.apk';

app.get('/', (req, res) => {
    const filePath = path.join(__dirname, APK_FILE);
    res.download(filePath, APK_FILE, (err) => {
        if (err) {
            console.error('Error sending file:', err);
            res.status(500).send('Error downloading the file');
        }
    });
});

app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
});
