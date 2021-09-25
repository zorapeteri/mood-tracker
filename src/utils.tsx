import { Context, initialState } from './context/Context';

export const getMockContext = (obj) => {
  const MockContext = ({ children }) => (
    <Context.Provider
      value={{
        ...initialState,
        ...obj,
      }}
    >
      {children}
    </Context.Provider>
  );

  return MockContext;
};
