import { useState} from 'react'
import DateView from 'react-datepicker'
import 'react-datepicker/dist/react-datepicker.css'
import './DatePicker.scss'

const DatePicker = ({ onChange }) => {
  const [selectedDate, setSelectedDate] = useState('')
  return(
    <div className="date-picker">
      <DateView
        selected={selectedDate}
        onChange={date => {setSelectedDate(date); onChange(date)}}
        className="date-picker__input"
      />
    </div>
  )
}

export default DatePicker;