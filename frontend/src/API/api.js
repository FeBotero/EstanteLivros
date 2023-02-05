const getRequest = function (url) {
  return fetch(url, {
    method: "GET",
  });
};
const createRequest = function (url, body) {
  return fetch(url, {
    method: "POST",
    body: JSON.stringify(body),
    headers: new Headers({
      "Content-type": "application/json",
    }),
  });
};

const deleteRequest = function (url) {
  return fetch(url, {
    method: "DELETE",
  });
};

const putRequest = function (url, body) {
  return fetch(url, {
    method: "PUT",
    body: JSON.stringify(body),
    headers: new Headers({
      "Content-Type": "application/json",
    }),
  });
};

export const Api = {
  baseUrl: "https://bookstore-backend-zwd6.onrender.com/",

  books: {
    endpoint: function () {
      return Api.baseUrl + "livros";
    },
    createUrl: function (body) {
      return createRequest(this.endpoint(), body);
    },
    readAll: function () {
      return getRequest(this.endpoint());
    },
    readByID: function (id) {
      return getRequest(this.endpoint() + "/" + id);
    },
    updateUrl: function (id, body) {
      return putRequest(this.endpoint() + "/" + id, body);
    },
    deleteUrl: function (id) {
      return deleteRequest(this.endpoint() + "/" + id);
    },
  },
  bookings: {
    endpoint: function () {
      return Api.baseUrl + "reservas";
    },
    createUrl: function (body) {
      return createRequest(this.endpoint(), body);
    },
    readAll: function () {
      return getRequest(this.endpoint());
    },
    readByID: function (id) {
      return getRequest(this.endpoint() + "/" + id);
    },
    updateUrl: function (id, body) {
      return putRequest(this.endpoint() + "/" + id, body);
    },
    deleteUrl: function (id) {
      return deleteRequest(this.endpoint() + "/" + id);
    },
  },
};
