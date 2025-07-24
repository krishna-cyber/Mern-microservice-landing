export interface Resturants {
  _id: string;
  name: string;
  address: string;
  createdAt: string;
  updatedAt: string;
}

export interface Category {
  _id: string;
  name: string;
  updatedAt: string;
  createdAt: string;
  attributes: string[];
  hasToppings: boolean;
}

interface ConfigurationOptions {
  [key: string]: {
    avilableOptions: { [key: string]: number };
  };
}

export interface ProductType {
  _id: string;
  name: string;
  description: string;
  priceConfiguration: ConfigurationOptions;
  image: string[];
  categoryId: Category;
  createdAt: string;
  updatedAt: string;
}

export type Topping = {
  _id: string;
  name: string;
  price: number;
  image: string;
  tenantId: string;
};

export interface HashProduct extends ProductType {
  chosenConfiguration: {
    [key: string]: string;
  };
  selectedToppings: Topping[];
}

type Address = {
  isDefault: boolean;
  text: string;
};

export type Customer = {
  _id: string;
  firstName: string;
  lastName: string;
  email: string;
  addresses: Address[];
};
