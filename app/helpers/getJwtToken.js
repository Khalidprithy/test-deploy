import jwt from 'jsonwebtoken';

const getJwtToken = id => {
    jwt.sign({ id: id }, process.env.SECRET_TOKEN, {
        expiresIn: { expireTime: '1day' }
    });
};

export default getJwtToken;
