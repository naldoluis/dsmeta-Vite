import DatePicker from 'react-datepicker'
import 'react-datepicker/dist/react-datepicker.css'
import NotificationButton from '../NotificationButton'
import { useEffect, useState } from 'react'
import { BASE_URL } from '../../utils/request'
import { Sale } from '../../models/sale'
import axios from 'axios'
import vite from '../../assets/img/vite.svg'
import './styles.css'

export default function SalesCard() {
  const min = new Date(new Date().setDate(new Date().getDate() - 365))
  const max = new Date()
 
  const [minDate, setMinDate] = useState(min)
  const [maxDate, setMaxDate] = useState(max)
  const [sales, setSales] = useState<Sale[]>([])

  useEffect(() => {
    const dmin = minDate.toISOString().slice(0, 10)
    const dmax = maxDate.toISOString().slice(0, 10)

    axios(`${BASE_URL}/sales?minDate=${dmin}&maxDate=${dmax}`).then(response => {
        setSales(response.data.content)
    })
  }, [minDate, maxDate])

  return (
    <div className="dsmeta-card">
      <a href="https://vitejs.dev" className="vite">
    <img src={vite}/>
    </a>
      <div>
      <h2 className="dsmeta-sales-title">Vendas</h2>
        <div className="dsmeta-form-control-container">
          <DatePicker
          selected={minDate}
          onChange={(date: Date) => setMinDate(date)}
          className="dsmeta-form-control"
          dateFormat="dd/MM/yyyy"/>
        </div>
        <div className="dsmeta-form-control-container">
          <DatePicker
            selected={maxDate}
            onChange={(date: Date) => setMaxDate(date)}
            className="dsmeta-form-control"
            dateFormat="dd/MM/yyyy"/>
          </div>
      </div>
      <div>
        <table className="dsmeta-sales-table">
          <thead>
            <tr>
              <th className="show992">ID</th>
              <th className="show576">Data</th>
              <th>Vendedor</th>
              <th className="show992">Visitas</th>
              <th className="show992">Vendas</th>
              <th>Total</th>
              <th>Notificar</th>
            </tr>
          </thead>
          <tbody>
            {sales.map(sale => {
              return (
                <tr key={sale.id}>
                <td className="show9926">{sale.id}</td>
                <td className="show576">{new Date(sale.date).toLocaleDateString()}</td>
                <td>{sale.sellerName}</td>
                <td className="show992">{sale.visited}</td>
                <td className="show992">{sale.deals}</td>
                <td>R$ {sale.amount.toFixed(2)}</td>
                <td>
                  <div className="dsmeta-red-btn-container">
                    <NotificationButton saleId={sale.id}/>
                  </div>
                </td>
              </tr>
              )})}
          </tbody>
        </table>
      </div>
    </div>
)}