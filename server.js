const express = require('express');
const path = require('path');
const fs = require('fs');
const app = express();
const port = process.env.PORT || 5500;

// Настройка middleware
app.use(express.static(path.join(__dirname))); // Для статических файлов
app.use(express.urlencoded({ extended: true })); // Для обработки форм

// Маршруты для всех страниц
const pages = ['', 'index', 'about', 'portfolio', 'contacts'];

pages.forEach(page => {
    const route = page === '' ? '/' : `/${page}`;
    const file = page === '' ? 'index.html' : `${page}.html`;
    
    app.get(route, (req, res) => {
        const filePath = path.join(__dirname, file);
        
        fs.access(filePath, fs.constants.F_OK, (err) => {
            if (err) {
                res.status(404).sendFile(path.join(__dirname, '404.html'));
                return;
            }
            res.sendFile(filePath);
        });
    });
});

// Обработка 404 ошибок
app.use((req, res) => {
    res.status(404).sendFile(path.join(__dirname, '404.html'));
});

// Запуск сервера
app.listen(port, () => {
    console.log(`Сервер запущен на http://localhost:${port} || http://lilikhome.ddns.net`);
    console.log('Доступные страницы:');
    pages.forEach(page => {
        if (page === '') page = 'index';
        console.log(`- http://localhost:${port}/${page}`);
    });
    console.log('\nДля остановки сервера нажмите Ctrl+C');
});