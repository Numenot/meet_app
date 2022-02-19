import React, { useEffect, useState } from 'react';
import { PieChart, Pie, Cell, Legend, ResponsiveContainer } from 'recharts';

const EventGenre = ({ events }) => {

  useEffect(() => {
    const getData = () => {
      const genres = ['React', 'JavaScript', 'Node', 'jQuery', 'AngularJS'];
      const data = genres.map(genre => {
        const value = events.filter(event =>
          event.summary.split(' ').includes(genre)
        ).length;
        return { name: genre, value };
      });
      return data;
    };
    setData(() => getData());
  }, [events]);

  const [data, setData] = useState([]);
  const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8A2BE2'];

  return (
    <ResponsiveContainer height={400} >
      <PieChart>
        <Pie
          data={data}
          cx={150}
          cy={150}
          labelLine={true}
          outerRadius={80}
          fill="#8884d8"
          dataKey="value"
          label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
        >
          {data.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
          ))}
        </Pie>
        <Legend
          layout='horizontal'
          verticalAlign='bottom'
          align='center'
          height={100}
        />
      </PieChart>
    </ResponsiveContainer >
  )
}

export default EventGenre;
