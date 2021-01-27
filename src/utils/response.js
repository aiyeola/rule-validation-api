class Response {
  static Success(res, message = null, data) {
    return res.status(200).json({
      message,
      status: 'success',
      data,
    });
  }

  static Error(res, message) {
    return res.status(400).json({
      message,
      status: 'error',
      data: null,
    });
  }
}

export default Response;
