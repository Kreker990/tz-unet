import { useState } from 'react'
import './App.css'
import FormCard from './components/FormCard/FormCard';
import CardInput from './components/CardInput/cardInput';
import CardTextArea from './components/CardTextArea/CardTextArea';
import CardSelect from './components/CardSelect/CardSelect';
import ChooseBlockForm from './components/ChooseBlockForm/ChooseBlockForm';

function App() {
  function formatNumber(num) {
    return parseFloat(num.toFixed(2));
  }
  const [load, setLoad] = useState(false)
  const [data, setData] = useState({
    som: "",
    usd: "",
    euro: "",

    priorities: "",

    email: "",
    confirmEmail: "",
    firstName: "",
    lastName: "",
    connectionToAuca: "",
    country: "",
    phone: "",

    inspiration: "",
    comment: "",

    checkbox: false
  })
  const request = async (e) => {
    e.preventDefault();
    setLoad(true)
    try {
      const response = await fetch('', {
        method: 'POST',
        headers: {
        },
        body: JSON.stringify(data)
      })
      if (response.status == 200) {
        const resData = await response.json();
        console.log(resData)
        setLoad(false)
        alert('succes')
      } else {
        setLoad(false)
        alert('error')
      }
    } catch (error) {
      alert('error')
      setLoad(false)
      console.log(error)
    }
  }

  const changeData = (property, e) => {
    setData((s) => {
      return { ...s, [property]: e.target.value }
    })
  }

  const changeOtherCurrency = (currency, value) => {
    const rates = {
      usd: { som: 89.65, euro: 0.93 },
      euro: { som: 96.24, usd: 1.08 },
      som: { usd: 0.0112, euro: 0.0104 }
    };

    const newValues = Object.keys(rates[currency]).reduce((acc, key) => {
      acc[key] = formatNumber(value * rates[currency][key]);
      return acc;
    }, {});

    setData(s => ({ ...s, ...newValues }));
  }

  const changePrice = (currency, e) => {
    setData((s) => {
      return { ...s, [currency]: e.target.value }
    })

    changeOtherCurrency(currency, e.target.value || 0)
  }

  const choosePrice = (currency, e) => {
    changeOtherCurrency(currency, e)

    setData((s) => {
      return { ...s, [currency]: e }
    })
  }
  return (
    <div className='main'>
      <form onSubmit={request}>
        <FormCard
          title={'1. Enter gift amount'}
          required={true}
          content={<>
            <p className='text'>
              PAYMENT SUMMARY <br />
              <b>You will be charged {data.som || '_____'} KGS.</b> This is a one-time gift.
            </p>
            <p className='text'>
              ** According to the requirements of the legislation of the
              Kyrgyz Republic, the amount of your contribution can only be
              withdrawn in the national currency - Kyrgyz Som (KGS).
            </p>
            <p className='text'>
              <b>At the moment we accept payments only with a VISA card and
                Kyrgyz national ELCART payment card.</b>
            </p>
            <p className='text'>
              Visa payment option details: please keep in mind that due to the
              difference of exchange rate between Visa payment system and Kyrgyz
              National Bank, your account might be debited slightly more than
              your original payment.
            </p>
          </>}
          inputs={<>
            <ChooseBlockForm
              arr={[1, 2, 3]}
              placeholder={'Other (USD)'}
              onchange={choosePrice}
              onchangeInput={changePrice}
              currency='usd'
            />
            <CardInput
              label={'Kyrgyz Som (KGS)'}
              type={'number'}
              required={true}
              value={data.som}
              onChange={e => changePrice('som', e)}
              placeholderText={'Kyrgyz Som (KGS)'}
            />
            <CardInput
              label={'USD **'}
              type={'number'}
              value={data.usd}
              onChange={e => changePrice('usd', e)}
              placeholderText={'USD **'}
            />
            <CardInput
              label={'EURO **'}
              type={'number'}
              value={data.euro}
              onChange={e => changePrice('euro', e)}
              placeholderText={'EURO **'}
            />
          </>
          } />
        <FormCard
          title={'2. Select Fund category'}
          inputs={<>
            <CardSelect
              label={'AUCA FUND priorities'}
              required={true}
              onChange={e => changeData('priorities', e)}
              options={[1, 2, 3, 4]}
              autocomplete={true}
            />
          </>}
        />
        <FormCard
          title={'3. Enter Your Contact Information'}
          inputs={<>
            <CardInput
              label={'Email'}
              type={'email'}
              value={data.email}
              required={true}
              onChange={e => changeData('email', e)}
              placeholderText={'Email'}
            />
            <CardInput
              label={'Confirm Email'}
              type={'email'}
              value={data.confirmEmail}
              required={true}
              onChange={e => changeData('confirmEmail', e)}
              placeholderText={'Confirm Email'}
            />
            <CardInput
              label={'First Name'}
              type={'text'}
              value={data.firstName}
              required={true}
              onChange={e => changeData('firstName', e)}
              placeholderText={'First Name'}
            />
            <CardInput
              label={'Last Name'}
              type={'text'}
              value={data.lastName}
              required={true}
              onChange={e => changeData('lastName', e)}
              placeholderText={'Last Name'}
            />
            <CardSelect
              label={'Your Connection to AUCA'}
              onChange={e => changeData('connectionToAuca', e)}
              options={[1, 2, 3, 4]}
              placeholder={'Your Connection to AUCA'}
            />
            <CardSelect
              label={'Country'}
              onChange={e => changeData('country', e)}
              options={['Kyrgyzstan', 'Russia', 'USA', 'China']}
              placeholder='Country'
            />
            <CardInput
              label={'Phone Number'}
              type={'text'}
              value={data.phone}
              onChange={e => changeData('phone', e)}
              placeholderText={'Phone Number'}
            />
          </>}
          content={<>
            <p className='text'>
              Format: + country code—area code—phone number <br />
              Example: +1-415-5552671
            </p>
          </>}
        />
        <FormCard
          title={'4. Please give your comments'}
          inputs={<>
            <CardTextArea
              label={"What inspired you to give today's gift to the AUCA Fund/Alumni Fund?"}
              type={'text'}
              value={data.inspiration}
              onChange={e => changeData('inspiration', e)}
              placeholderText={"What inspired you to give today's gift to the AUCA Fund/Alumni Fund?"}
              rows={4}
            />
            <CardTextArea
              label={"Comments"}
              type={'text'}
              value={data.comment}
              onChange={e => changeData('comment', e)}
              placeholderText={"Comments"}
            />
          </>}
        />
        <div className='container'>
          <label className={'label'}>
            <p className={'label_text'}>
              Public Offer <span style={{ color: 'red' }}>*</span>
            </p>
            <div><input
              value={data.checkbox}
              onChange={e => { setData((s) => { return { ...s, checkbox: e.target.checked } }) }}
              required
              type='checkbox'
            /><b> I have read and agree with the <a
              className='a'
              target='_blank'
              href='https://www.youtube.com/watch?v=3UOJW3XrqYo'>
              Public Offer</a></b></div>
          </label>
          <label className={'label'}>
            <p className={'label_text'}>
            </p>
            <p><b>If you have questions, please contact the Development office,<br />
              by phone at +996-312-915000 ext. 104 or email development@auca.kg.</b></p>
          </label>
          <label className={'label'}>
            <p className={'label_text'}>
            </p>
            <p style={{ color: 'gray' }}><span style={{ color: 'red' }}>*</span> - Обязательное поле</p>
          </label>
          <label className={'label'}>
            <p className={'label_text'}>
            </p>
            <input type="submit" value={load ? 'Загрузка...' : "Отправить"} name="oksend" className='button' disabled={load} />
          </label>
        </div>
      </form>
    </div>
  )
}

export default App
