export interface Product {
  id: number;
  name: string;
  price: number;
  image: string;
  salesRank: number;
  sales: number;
  returns: number;
}

export const products: Product[] = [
  {
    id: 1,
    name: 'ELECTRA X2',
    price: 4300,
    image: 'https://s3-us-west-2.amazonaws.com/dev-or-devrl-s3-bucket/sample-apps/ebikes/electrax2.jpg',
    salesRank: 2,
    sales: 886617,
    returns: 21
  },
  {
    id: 2,
    name: 'DYNAMO X4',
    price: 7800,
    image: 'https://s3-us-west-2.amazonaws.com/dev-or-devrl-s3-bucket/sample-apps/ebikes/dynamox4.jpg',
    salesRank: 4,
    sales: 1498380,
    returns: 20
  },
  {
    id: 3,
    name: 'FUSE X4',
    price: 2800,
    image: 'https://s3-us-west-2.amazonaws.com/dev-or-devrl-s3-bucket/sample-apps/ebikes/fusex4.jpg',
    salesRank: 3,
    sales: 1089984,
    returns: 48
  },
  {
    id: 4,
    name: 'DYNAMO X1',
    price: 7000,
    image: 'https://s3-us-west-2.amazonaws.com/dev-or-devrl-s3-bucket/sample-apps/ebikes/dynamox1.jpg',
    salesRank: 4,
    sales: 1618260,
    returns: 27
  },
  {
    id: 5,
    name: 'VOLT X4',
    price: 1900,
    image: 'https://s3-us-west-2.amazonaws.com/dev-or-devrl-s3-bucket/sample-apps/ebikes/voltx4.jpg',
    salesRank: 2,
    sales: 777214,
    returns: 68
  },
  {
    id: 6,
    name: 'ELECTRA X4',
    price: 4900,
    image: 'https://s3-us-west-2.amazonaws.com/dev-or-devrl-s3-bucket/sample-apps/ebikes/electrax4.jpg',
    salesRank: 3,
    sales: 1134644,
    returns: 36
  },
  {
    id: 7,
    name: 'VOLT X2',
    price: 1400,
    image: 'https://s3-us-west-2.amazonaws.com/dev-or-devrl-s3-bucket/sample-apps/ebikes/voltx2.jpg',
    salesRank: 1,
    sales: 545160,
    returns: 54
  },
  {
    id: 8,
    name: 'DYNAMO X2',
    price: 7200,
    image: 'https://s3-us-west-2.amazonaws.com/dev-or-devrl-s3-bucket/sample-apps/ebikes/dynamox2.jpg',
    salesRank: 4,
    sales: 1527192,
    returns: 26
  },
  {
    id: 9,
    name: 'ELECTRA X3',
    price: 4600,
    image: 'https://s3-us-west-2.amazonaws.com/dev-or-devrl-s3-bucket/sample-apps/ebikes/electrax3.jpg',
    salesRank: 2,
    sales: 931270,
    returns: 19
  },
  {
    id: 10,
    name: 'VOLT X3',
    price: 1800,
    image: 'https://s3-us-west-2.amazonaws.com/dev-or-devrl-s3-bucket/sample-apps/ebikes/voltx3.jpg',
    salesRank: 1,
    sales: 718920,
    returns: 62
  },
  {
    id: 11,
    name: 'FUSE X1',
    price: 2500,
    image: 'https://s3-us-west-2.amazonaws.com/dev-or-devrl-s3-bucket/sample-apps/ebikes/fusex1.jpg',
    salesRank: 3,
    sales: 1079800,
    returns: 62
  },
  {
    id: 12,
    name: 'FUSE X2',
    price: 2600,
    image: 'https://s3-us-west-2.amazonaws.com/dev-or-devrl-s3-bucket/sample-apps/ebikes/fusex2.jpg',
    salesRank: 3,
    sales: 999024,
    returns: 60
  }
]; 