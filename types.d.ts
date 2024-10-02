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

interface carouselProduct {
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

interface cardProduct {
  _id: number;
  title: string;
  isNew?: boolean;
  oldPrice?: string;
  price: number;
  description: string;
  category: string;
  image: string;
  rating: number;
}

interface cartProducts {
  id: string;
  title: string;
  price: number;
  description: number;
  category: string;
  image: string;
  rating: number;
  createdAt: string;
  updatedAt: string;
  userId: string;
}
