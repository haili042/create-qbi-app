import { shallowEqual } from 'react-redux';

export function shallowEqualProp(lastProp: any, currentProp: any) {
  const lastKeys = Object.keys(lastProp);
  const currentKeys = Object.keys(currentProp);

  if (lastKeys.length !== currentKeys.length) {
    return false;
  }

  for (let i = 0; i < lastKeys.length; i++) {
    if (!shallowEqual(lastProp[lastKeys[i]], currentProp[lastKeys[i]])) {
      return false;
    }
  }

  return true;
}
