type InputEvent<TValue = unknown> = {
  target: { value: TValue; name: string };
};

export default InputEvent;
