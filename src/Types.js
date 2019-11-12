export type Customer = {
  value: String,
  address: String,
  mobile: String,
  gender: String
};

export type Category = {
  value: String,
  gender: String,
  sizes: String[]
};

export const Size = {
  name: String,
  value: Number
};

export type ITEM = {
  customerName: String,
  category: Category,
  sizes: Size[]
};
