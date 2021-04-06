import DateView from 'react-datepicker'
import 'react-datepicker/dist/react-datepicker.css'
import './DatePicker.scss'

const DatePicker = () => {
  return(
    <div className="date-picker">
      <DateView
        className="date-picker__input"
      />
    </div>
  )
}

export default DatePicker;