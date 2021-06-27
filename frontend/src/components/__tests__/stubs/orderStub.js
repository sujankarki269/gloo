export const sampleOrderArray = [
  {
    shippingAddress: {
      address: "26 College Ave East",
      city: "Singapore",
      postalCode: "096429",
      country: "Singapore",
    },
    paymentResult: {
      id: "87E378354D541734B",
      status: "COMPLETED",
      update_time: "2021-06-27T07:59:10Z",
      email_address: "sb-rg7po6147151@personal.example.com",
    },
    taxPrice: 64.5,
    shippingPrice: 0,
    totalPrice: 494.48,
    isPaid: true,
    isDelivered: false,
    _id: "60d82fb65ab70e8b14f7fb79",
    orderItems: [
      {
        _id: "60d82fb65ab70e8b14f7fb7a",
        product: "60bde864ee22a3fe946663a5",
        name: "Lite Mobile",
        image: "/images/mobilerepair.jpg",
        price: 29.99,
        qty: 1,
      },
      {
        _id: "60d82fb65ab70e8b14f7fb7b",
        product: "60bde864ee22a3fe946663a2",
        name: "Plumbing and Sanitary Installation",
        image: "/images/plumbing.jpg",
        price: 399.99,
        qty: 1,
      },
    ],
    user: "60bde864ee22a3fe9466639d",
    paymentMethod: "PayPal",
    createdAt: "2021-06-27T07:58:46.748Z",
    updatedAt: "2021-06-27T07:59:11.187Z",
    __v: 0,
    paidAt: "2021-06-27T07:59:11.186Z",
  },
  {
    shippingAddress: {
      address: "26 College Ave East",
      city: "Singapore",
      postalCode: "096429",
      country: "Singapore",
    },
    paymentResult: {
      id: "5YF27979RN941004U",
      status: "COMPLETED",
      update_time: "2021-06-27T07:59:40Z",
      email_address: "sb-rg7po6147151@personal.example.com",
    },
    taxPrice: 13.5,
    shippingPrice: 100,
    totalPrice: 203.49,
    isPaid: true,
    isDelivered: false,
    _id: "60d82fdf5ab70e8b14f7fb7c",
    orderItems: [
      {
        _id: "60d82fdf5ab70e8b14f7fb7d",
        product: "60bde864ee22a3fe9466639f",
        name: "1st Solution Electrical",
        image: "/images/electrical.jpg",
        price: 89.99,
        qty: 1,
      },
    ],
    user: "60bde864ee22a3fe9466639d",
    paymentMethod: "PayPal",
    createdAt: "2021-06-27T07:59:27.867Z",
    updatedAt: "2021-06-27T07:59:40.962Z",
    __v: 0,
    paidAt: "2021-06-27T07:59:40.959Z",
  },
  {
    shippingAddress: {
      address: "26 College Ave East",
      city: "Singapore",
      postalCode: "096429",
      country: "Singapore",
    },
    taxPrice: 7.5,
    shippingPrice: 100,
    totalPrice: 157.49,
    isPaid: false,
    isDelivered: false,
    _id: "60d8303d5ab70e8b14f7fb7e",
    orderItems: [
      {
        _id: "60d8303d5ab70e8b14f7fb7f",
        product: "60bde864ee22a3fe946663a3",
        name: "Techbro Computer Services",
        image: "/images/computer.jpg",
        price: 49.99,
        qty: 1,
      },
    ],
    user: "60bde864ee22a3fe9466639d",
    paymentMethod: "PayPal",
    createdAt: "2021-06-27T08:01:01.466Z",
    updatedAt: "2021-06-27T08:01:01.466Z",
    __v: 0,
  },
  {
    shippingAddress: {
      address: "26 College Ave East",
      city: "Singapore",
      postalCode: "096429",
      country: "Singapore",
    },
    taxPrice: 90,
    shippingPrice: 0,
    totalPrice: 689.99,
    isPaid: false,
    isDelivered: false,
    _id: "60d8304d5ab70e8b14f7fb80",
    orderItems: [
      {
        _id: "60d8304d5ab70e8b14f7fb81",
        product: "60bde864ee22a3fe946663a0",
        name: "SIN JIT SENG BUILDING",
        image: "/images/home-repair.jpg",
        price: 599.99,
        qty: 1,
      },
    ],
    user: "60bde864ee22a3fe9466639d",
    paymentMethod: "PayPal",
    createdAt: "2021-06-27T08:01:17.336Z",
    updatedAt: "2021-06-27T08:01:17.336Z",
    __v: 0,
  },
];

export const sampleUnpaidOrder = {
  shippingAddress: {
    address: "26 College Ave East",
    city: "Singapore",
    postalCode: "096429",
    country: "Singapore",
  },
  taxPrice: 7.5,
  shippingPrice: 100,
  totalPrice: 157.49,
  isPaid: false,
  isDelivered: false,
  _id: "60d8303d5ab70e8b14f7fb7e",
  orderItems: [
    {
      _id: "60d8303d5ab70e8b14f7fb7f",
      product: "60bde864ee22a3fe946663a3",
      name: "Techbro Computer Services",
      image: "/images/computer.jpg",
      price: 49.99,
      qty: 1,
    },
  ],
  user: "60bde864ee22a3fe9466639d",
  paymentMethod: "PayPal",
  createdAt: "2021-06-27T08:01:01.466Z",
  updatedAt: "2021-06-27T08:01:01.466Z",
  __v: 0,
};
