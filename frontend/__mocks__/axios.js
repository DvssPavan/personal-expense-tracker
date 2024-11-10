// __mocks__/axios.js
const mockAxios = {
    get: jest.fn(() => Promise.resolve({ data: [] })),
    post: jest.fn(() => Promise.resolve({ data: {} })),
    interceptors: {
      request: { use: jest.fn(), eject: jest.fn() },
      response: { use: jest.fn(), eject: jest.fn() },
    },
    create: jest.fn(function () {
      return mockAxios;
    }),
  };
  
  export default mockAxios;
  