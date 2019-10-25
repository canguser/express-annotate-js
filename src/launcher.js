import express from 'express';

const app = express();

export {app};

const launcher = {
    start: (port) => {
        app.listen(port, () => console.log(`Example app listening on port http://localhost:${port}!`))
    },
};

export {launcher};