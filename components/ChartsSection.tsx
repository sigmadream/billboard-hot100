import { ChartData } from '@/types/chart'
import ChartItem from '@/components/ChartItem'

interface ChartsSectionProps {
    chartsData: ChartData[]
}

export default function ChartsSection({ chartsData }: ChartsSectionProps) {
    return (
        <section className="mb-16">
            <h2 className="text-2xl md:text-3xl font-bold mb-2">Charts 4-100</h2>
            <p className="text-sm md:text-base text-gray-600 mb-8">계속해서 사랑받고 있는 노래들</p>
            <div className="flex flex-col gap-3">
                {chartsData.map((chart) => (
                    <ChartItem key={chart.rank} {...chart} />
                ))}
            </div>
        </section>
    )
}