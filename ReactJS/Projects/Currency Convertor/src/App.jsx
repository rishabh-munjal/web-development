import { useState } from 'react'
import InputBox from './components/InputBox'
import useCurrencyInfo from './hooks/useCurrencyInfo'
import './App.css'

function App() {
  const [amount, setAmount] = useState(0)
  const [from, setFrom] = useState('USD')
  const [to, setTo] = useState('INR')
  const [convertedAmount, setConvertedAmount] = useState(0)

  const currencyInfo = useCurrencyInfo(from)
  const options = currencyInfo ? Object.keys(currencyInfo.rates) : []

  const swap = () => {
    setFrom(to)
    setTo(from)
    setConvertedAmount(amount)
    setAmount(convertedAmount)
  }

  const convert = (e) => {
    e.preventDefault()
    if (currencyInfo && currencyInfo.rates[to]) {
      setConvertedAmount(amount * currencyInfo.rates[to])
    }
  }

  return (
    <div className="flex justify-center items-center h-screen bg-[#1E1E21]">
      <form className="bg-[#262629] w-[40%] h-auto p-6 rounded-xl flex flex-col space-y-4" onSubmit={(e) => {
        e.preventDefault()
        convert()
      }}>
        <span className="text-[#9CA3AF] font-semibold text-lg text-center">
          Currency Converter
        </span>
        <div className='h-[0.5px] w-full bg-gray-600'></div>
        <InputBox
          label="From"
          amount={amount}
          onAmountChange={setAmount}
          onCurrencyChange={(currency) => setAmount(amount)}
          currencyOptions={options}
          selectCurrency={from}
        />
        <button type="button" className='bg-white text-black py-2 px-4 rounded-lg self-center' onClick={swap}>
          Swap
        </button>
        <InputBox
          label="To"
          amount={convertedAmount}
          onAmountChange={setConvertedAmount}
          onCurrencyChange={(currency) => setTo(amount)}
          currencyOptions={options}
          selectCurrency={from}
        />
        <button type="submit" className='bg-white text-black py-2 px-4 rounded-lg self-center'>
          Convert
        </button>
      </form>
    </div>
  )
}

export default App