import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts'

export const EventStatsBarChart = ({ activeEvents, inactiveEvents, totalTicketsSold }: { activeEvents: number, inactiveEvents: number, totalTicketsSold: number }) => {
    const data = [
        { name: 'Active', value: activeEvents },
        { name: 'Inactive', value: inactiveEvents },
        { name: 'Tickets Sold', value: totalTicketsSold }
    ]

    return (
        <div className="w-full h-80 bg-white rounded-lg shadow-md p-4">
            <ResponsiveContainer>
                <BarChart data={data} margin={{ top: 20, right: 20, left: 20, bottom: 20 }}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                    <XAxis 
                        dataKey="name" 
                        tick={{ fill: '#64748b', fontSize: 12 }}
                        axisLine={{ stroke: '#e2e8f0' }}
                    />
                    <YAxis 
                        allowDecimals={false}
                        tick={{ fill: '#64748b', fontSize: 12 }}
                        axisLine={{ stroke: '#e2e8f0' }}
                    />
                    <Tooltip 
                        contentStyle={{ 
                            backgroundColor: 'white',
                            border: '1px solid #e2e8f0',
                            borderRadius: '6px',
                            boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
                        }}
                    />
                    <Bar 
                        dataKey="value" 
                        fill="#6366f1" 
                        radius={[8, 8, 0, 0]}
                        maxBarSize={50}
                    />
                </BarChart>
            </ResponsiveContainer>
        </div>
    )
}
