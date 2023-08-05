class DuplicationError extends Error {
  constructor(message) {
    super(message);
    this.name = 'DuplicationError';
    this.statusCode = 401;
  }
}

module.exports = DuplicationError;
