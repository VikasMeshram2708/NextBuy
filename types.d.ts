interface User {
  id: string;
  username: string;
  email: string;
  password: string;
  product: [];
  createdAt: Date;
  updatedAt: Date;
}

interface UserSession {
  email: string;
  sub: string;
  id: string;
  username: "vikas";
  iat: number;
  exp: number;
  jti: string;
}

interface Product {
  id: number;
  title: string;
  price: number;
  description: string;
  category: string;
  image: string;
  rating: {
    rate: number;
    count: number;
  };
}

interface dProduct {
  _id: number;
  title: string;
  isNew: true;
  oldPrice: string;
  price: number;
  description: string;
  category: string;
  image: string;
  rating: number;
}
