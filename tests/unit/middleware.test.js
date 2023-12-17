const authMiddleware = require('../../src/middleware/auth');
const jwt = require('jsonwebtoken');

describe('authMiddleware', () => {
  it('should throw an error for missing token', (done) => {
    const req = { headers: {} };
    const res = { status: jest.fn().mockReturnThis(), json: jest.fn() };
    const next = jest.fn();
    authMiddleware.verifyToken(req, res, next);
    expect(next).not.toHaveBeenCalled();
    expect(res.status).toHaveBeenCalledWith(401);
    done();
  });

  it('should throw an error for invalid token', (done) => {
    const req = { headers: { authorization: 'invalid_token' } };
    const res = { status: jest.fn().mockReturnThis(), json: jest.fn() };
    const next = jest.fn();
    jwt.verify = jest.fn(() => { throw new Error('Invalid token'); });
    authMiddleware.verifyToken(req, res, next);
    expect(next).not.toHaveBeenCalled();
    expect(res.status).toHaveBeenCalledWith(401);
    done();
  });
});

