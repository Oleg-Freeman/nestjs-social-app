interface ModelOptions {
  maxStringFieldLength: number;
  minStringFieldLength: number;
  minPasswordLength: number;
}

export const modelOptions: ModelOptions = {
  maxStringFieldLength: 255,
  minStringFieldLength: 3,
  minPasswordLength: 6,
};

export const passwordRegEx =
  /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])/;
