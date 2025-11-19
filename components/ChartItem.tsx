import Image from 'next/image'
import { ChartData } from '@/types/chart'

export default function ChartItem({
    rank,
    change,
    changeColor,
    imageUrl,
    title,
    artist,
    peak,
    weeks
}: ChartData) {
    return (
        <div className="grid grid-cols-[40px_30px_50px_1fr] md:grid-cols-[50px_40px_60px_1fr_80px_80px] gap-2 md:gap-4 items-center p-4 rounded-lg hover:bg-gray-100 transition-colors">
            <div className="text-xl font-bold text-center">{rank}</div>
            <div className={`flex items-center justify-center font-bold ${changeColor}`}>
                {change}
            </div>
            <Image
                src={imageUrl}
                alt={title}
                width={60}
                height={60}
                className="rounded-lg object-cover"
            />
            <div className="flex flex-col">
                <div className="font-bold mb-1">{title}</div>
                <div className="text-xs md:text-sm text-gray-600">{artist}</div>
            </div>
            <div className="hidden md:block text-center text-gray-600 text-sm">Peak: {peak}</div>
            <div className="hidden md:block text-center text-gray-600 text-sm">Weeks: {weeks}</div>
        </div>
    )
}