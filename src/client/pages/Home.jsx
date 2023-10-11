import React, { useState } from 'react';
import { useQuery } from '@wasp/queries';
import { useAction } from '@wasp/actions';
import getBalance from '@wasp/queries/getBalance';
import sendBitcoin from '@wasp/actions/sendBitcoin';
import addBitcoin from '@wasp/actions/addBitcoin';

export function HomePage() {
  const { data: balance, isLoading, error } = useQuery(getBalance, { userId: 1 });
  const sendBitcoinFn = useAction(sendBitcoin);
  const addBitcoinFn = useAction(addBitcoin);
  const [sendBitcoinAddress, setSendBitcoinAddress] = useState('');
  const [sendBitcoinAmount, setSendBitcoinAmount] = useState(0);
  const [addBitcoinAmount, setAddBitcoinAmount] = useState(0);

  if (isLoading) return 'Loading...';
  if (error) return 'Error: ' + error;

  const handleSendBitcoin = () => {
    sendBitcoinFn({ address: sendBitcoinAddress, amount: sendBitcoinAmount });
    setSendBitcoinAddress('');
    setSendBitcoinAmount(0);
  };

  const handleAddBitcoin = () => {
    addBitcoinFn({ amount: addBitcoinAmount });
    setAddBitcoinAmount(0);
  };

  return (
    <div className='p-4'>
      <h1 className='text-3xl font-bold mb-4'>MCrpto</h1>

      <div className='mb-4'>
        <h2 className='text-2xl'>Bitcoin Balance: {balance.bitcoinBalance}</h2>
        <h2 className='text-2xl'>Kenyan Shilling Balance: {balance.shillingBalance}</h2>
      </div>

      <div className='mb-4'>
        <h3 className='text-xl font-bold'>Send Bitcoin</h3>
        <input
          type='text'
          placeholder='Bitcoin Address'
          className='px-1 py-2 border rounded text-lg'
          value={sendBitcoinAddress}
          onChange={(e) => setSendBitcoinAddress(e.target.value)}
        />
        <input
          type='number'
          placeholder='Amount'
          className='px-1 py-2 border rounded text-lg'
          value={sendBitcoinAmount}
          onChange={(e) => setSendBitcoinAmount(Number(e.target.value))}
        />
        <button
          onClick={handleSendBitcoin}
          className='bg-blue-500 hover:bg-blue-700 px-2 py-2 text-white font-bold rounded'
        >
          Send Bitcoin
        </button>
      </div>

      <div className='mb-4'>
        <h3 className='text-xl font-bold'>Add Bitcoin</h3>
        <input
          type='number'
          placeholder='Amount'
          className='px-1 py-2 border rounded text-lg'
          value={addBitcoinAmount}
          onChange={(e) => setAddBitcoinAmount(Number(e.target.value))}
        />
        <button
          onClick={handleAddBitcoin}
          className='bg-green-500 hover:bg-green-700 px-2 py-2 text-white font-bold rounded'
        >
          Add Bitcoin
        </button>
      </div>
    </div>
  );
}