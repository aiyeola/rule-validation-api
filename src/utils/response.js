class Response {
  static Success(res, message = null, data) {
    return res.status(200).json({
      message,
      status: 'success',
      data,
    });
  }

  static Error(res, message, data = null) {
    return res.status(400).json({
      message,
      status: 'error',
      data,
    });
  }
}

export default Response;
