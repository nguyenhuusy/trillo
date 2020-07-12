import React, { useState, Component } from "react"
import dayjs from "dayjs"
import range from "lodash-es/range"
import "./Calendar.scss"
import { save_deadline } from '../../redux/actions/tableAction';
import {connect} from 'react-redux';
//const {save_deadline}=this.props;
const weekDays = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"]

const todayObj = dayjs()

const Calendar = (props) => {
  const [dayObj, setDayObj] = useState(dayjs())
  
  const thisYear = dayObj.year()
  const thisMonth = dayObj.month() // (January as 0, December as 11)
  const daysInMonth = dayObj.daysInMonth()

  const dayObjOf1 = dayjs(`${thisYear}-${thisMonth + 1}-1`)
  const weekDayOf1 = dayObjOf1.day() // (Sunday as 0, Saturday as 6)

  const dayObjOfLast = dayjs(`${thisYear}-${thisMonth + 1}-${daysInMonth}`)
  const weekDayOfLast = dayObjOfLast.day()

  const handlePrev = () => {
    setDayObj(dayObj.subtract(1, "month"))
  }

  const handleNext = () => {
    setDayObj(dayObj.add(1, "month"))
  }
  
  //const {save_deadline}
  return (
    <div className="calendar">
      <div className="header-calendar">
        <button type="button" className="nav--prev" onClick={handlePrev}>
          &lt;
        </button>
        <div className="datetime">{dayObj.format("MMM DD YYYY")}</div>
        <button type="button" className="nav--prev" onClick={handleNext}>
          &gt;
        </button>
      </div>
      <div className="week-container">
        {weekDays.map(d => (
          <div className="week-cell" key={d}>
            {d}
          </div>
        ))}
      </div>
      <div className="day-container">
        {range(weekDayOf1).map(i => (
          <button onClick={()=>{
            props.save_deadline(dayObjOf1.subtract(weekDayOf1 - i, "day").format("MMM DD YYYY"));
            }} className="day-cell day-cell--faded" key={i}>
            {dayObjOf1.subtract(weekDayOf1 - i, "day").date()}
          </button>
        ))}

        {range(daysInMonth).map(i => (
          <button onClick={()=>{
            props.save_deadline(`${todayObj.format("MMM")} ${i+1} ${todayObj.format("YYYY")}`);
           }}
            className={`day-cell day-cell--in-month${
              i + 1 === todayObj.date() &&
              thisMonth === todayObj.month() &&
              thisYear === todayObj.year()
                ? " day-cell--today"
                : ""
            }`}
            key={i}
          >
            {i + 1}
          </button>
        ))}

        {range(6 - weekDayOfLast).map(i => (
          <button onClick={()=>{
            props.save_deadline(dayObjOfLast.add(i + 1, "day").format("MMM DD YYYY"));
            }} className="day-cell day-cell--faded" key={i}>
            {dayObjOfLast.add(i + 1, "day").date()}
          </button>
        ))}
      </div>
    </div>
  )
}
class Calendars extends Component {
render(){
  return(
    <div>haha</div>
  )
}
}

const mapStateToProps = state => ({
  
  deadline:state.table.deadline

})
export default connect(mapStateToProps, { save_deadline })(Calendar);