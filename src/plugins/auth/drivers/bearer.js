const bearer = {
  request: function (req, token) {
    this.http.setHeaders.call(this, req, {
      Authorization: 'Bearer ' + token
    });
  },
  response: function (res) {
    const headers = this.http.getHeaders.call(this, res);
    let token = headers.Authorization || headers.authorization;

    if (token) {
      token = token.split(/Bearer:?\s?/i);
      return token[token.length > 1 ? 1 : 0].trim();
    } else if (res.data?.token) {
      return res.data?.token.trim();
    }
  }
};

export default bearer;
