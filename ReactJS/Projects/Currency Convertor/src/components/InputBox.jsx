import React, { useState } from 'react'
import useCurrencyInfo from '../hooks/useCurrencyInfo'

function InputBox({ label , amount , onAmountChange , onCurrencyChange , currencyOptions = [] , selectCurrency = "USD" , }) {

  // const [currency, setCurrency] = useState('USD')

  // const currencyInfo = useCurrencyInfo(currency)

  return (
    <div className="w-full">
      <div className='flex flex-col md:flex-row justify-between items-center w-full p-2 text-white bg-[#1E1E21] rounded-lg space-y-2 md:space-y-0 md:space-x-2'>
        <input type="number" placeholder={label} value={amount} onChange={(e) => onAmountChange && onAmountChange(Number(e.target.value ))} className='bg-[#1E1E21] p-2 rounded-lg w-full md:w-auto' />
        <select
          className='bg-[#0F0F10] p-2 rounded-lg w-full md:w-auto'
          value={selectCurrency} 
          onChange={(e) => onCurrencyChange && onCurrencyChange(e.target.value)}
        >
         {currencyOptions.map((currency) => (
          <option key={currency} value={currency}>
            {currency}
          </option>
         ))}
        </select>
      </div>

    </div>
  )
}

export default InputBox