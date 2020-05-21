import express from 'express';

export const app = express();

export {express}

export const launcher = {
    start: (port) => {
        app.listen(port, () => console.log(`Example app listening on port http://localhost:${port}!`))
    },
};
