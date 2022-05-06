export function assertProperties(props: string[], object: object) {
  const data = props.every((prop) => hasOwnProperty(object, prop));
  if (!data)
    throw Error('Frontend object model does not match backend object model');
}

function hasOwnProperty<T, K extends PropertyKey>(
  obj: T,
  prop: K
): obj is T & Record<K, unknown> {
  return Object.prototype.hasOwnProperty.call(obj, prop);
}

export function assign<T, U>(target: T, source: U): asserts target is T & U {
  Object.assign(target, source);
}
