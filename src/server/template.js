module.exports = () => {
    return `
        <!DOCTYPE html>
        <html>
        <head>
            <title>Test app</title>
            <meta name="viewport" content="initial-scale=1,width=device-width" />
            <link rel="stylesheet" href="/build/bundle.css" />
        </head>
        <body>
            <div id="root"></div>
        </body>
        <script src="/build/vendor.js"></script>
        <script src="/build/data.js"></script>
        <script src="/build/index.js"></script>
        </html>
    `;
};
