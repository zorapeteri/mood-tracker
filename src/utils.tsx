import { Context, initialState } from './context/Context';

export const getMockContext = (obj: any) => {
  const MockContext = ({ children }: { children: any }) => (
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
