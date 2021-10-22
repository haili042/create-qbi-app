import React from 'react';
import { createStore } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import { useSelector, useDispatch, useStore, Provider } from 'react-redux';
import { shallowEqualProp } from './utils';

export const initialAppState = {
  card: {
    top: 0,
    left: 0,
    width: 6,
    height: 12,
    canvasWidth: 0,
    canvasHeight: 0,
  },
  customProps: {},
  setting: {},
};

const composeByDevTools = composeWithDevTools({
  trace: true,
});

export const reducer = (state, action) => {
  switch (action.type) {
    case 'change': {
      return {
        ...state,
        ...action.payload,
      };
    }
    case 'changeCard': {
      return {
        ...state,
        card: {
          ...state.card,
          ...action.payload,
        },
      };
    }
    case 'changeCustomPropsViewConfig': {
      return {
        ...state,
        customProps: {
          ...state.customProps,
          viewConfig: {
            ...state.customProps.viewConfig,
            ...action.payload,
          },
        },
      };
    }
    default:
      return state;
  }
};

export function createContext<Value, State = any>(useHook: (initialState?: State) => Value) {
  const initialState: any = {};
  const Context = React.createContext<Value>(initialState);

  const Provider: React.FC<{
    initialState?: State;
  }> = props => {
    const value = useHook(props.initialState);
    return <Context.Provider value={value}>{props.children}</Context.Provider>;
  };

  const useContext = () => {
    const value = React.useContext(Context);
    return value;
  };

  return {
    Provider,
    useContext,
  };
}

export const useAppContext = (...selectors) => {
  const store = useStore();
  const dispatch = useDispatch();

  const selectorValues = useSelector(
    state =>
      selectors.reduce((last, selector) => {
        return {
          ...last,
          ...selector(state),
        };
      }, {}),
    shallowEqualProp,
  );

  const setCard = React.useCallback(
    payload => {
      dispatch({
        type: 'changeCard',
        payload,
      });
    },
    [dispatch],
  );

  const setCustomPropsViewConfig = React.useCallback(
    payload => {
      dispatch({
        type: 'changeCustomPropsViewConfig',
        payload,
      });
    },
    [dispatch],
  );

  return {
    ...selectorValues,
    store,
    dispatch,
    setCard,
    setCustomPropsViewConfig,
  };
};

export const App: React.FC<{ initState: any }> = props => {
  const [store, setStore] = React.useState(null);

  React.useEffect(() => {
    setStore(
      createStore(
        reducer,
        {
          card: {
            ...initialAppState.card,
            ...(props?.initState?.card ?? {}),
          },
          customProps: {
            ...initialAppState.customProps,
            ...(props?.initState?.customProps ?? {}),
          },
          setting: {
            ...initialAppState.setting,
            ...(props?.initState?.setting ?? {}),
          },
        },
        composeByDevTools(),
      ),
    );
  }, [props.initState]);

  if (store === null) {
    return null;
  }

  return <Provider store={store}>{props.children}</Provider>;
};
