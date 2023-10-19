import React, { use, useEffect, useState } from 'react';
import Image from 'next/image'
import { Inter } from 'next/font/google'
import {Elements} from '@stripe/react-stripe-js';
import {loadStripe} from '@stripe/stripe-js';
import book from '../public/book.png';

const inter = Inter({ subsets: ['latin'] })

export default function Home() {
  const [publishablekey, setPublishableKey] = useState('')

  useEffect(() => {
    fetch('api/keys', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
      }
    }).then((res) => res.json())
    .then((data) => {
      setPublishableKey(data.publishableKey)
    })
  })
  if(!publishablekey){
    return 'Loading....'
  }

  const handlePay = async() => {
    const stripe = await stripePromise;

    const response = await fetch('/api/checkout/session', { method: 'POST' });
    const session = await response.json();

    const result = await stripe?.redirectToCheckout({
      sessionId: session.id,
    });
  }

  const stripePromise = loadStripe(publishablekey);

  return (
    <main>
      <h1>Book Store</h1>
      <Image src={book} alt="book" width={200} height={200} />
      <button>Buy book now</button>
    </main>
  )
}
