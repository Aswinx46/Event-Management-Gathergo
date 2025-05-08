import { PieChart, Pie, Cell, Tooltip, Legend, ResponsiveContainer } from 'recharts'

const COLORS = ['#38bdf8', '#4ade80', '#f87171'] // blue, green, red

interface StatusCountType {
    statusCount:{
    cancelled: number
    completed: number
    upcoming: number

}
}

export const EventStatusPie = ({ statusCount }: StatusCountType) => {
    const data = Object.entries(statusCount).map(([key, value]) => ({
        name: key,
        value
    }))

    return (
        <div className="w-full h-80">
            <ResponsiveContainer>
                <PieChart>
                    <Pie
                        data={data}
                        dataKey="value"
                        nameKey="name"
                        cx="50%"
                        cy="50%"
                        outerRadius={100}
                        label
                    >
                        {data.map((_, index) => (
                            <Cell key={index} fill={COLORS[index % COLORS.length]} />
                        ))}
                    </Pie>
                    <Tooltip />
                    <Legend />
                </PieChart>
            </ResponsiveContainer>
        </div>
    )
}
