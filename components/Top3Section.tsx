import { Top3Item } from '@/types/chart'
import Link from 'next/link'
import { createSongSlug } from '@/lib/csvParser'

interface Top3SectionProps {
    top3Data: Top3Item[]
}

export default function Top3Section({ top3Data }: Top3SectionProps) {
    return (
        <section className="mb-16 bg-white rounded-2xl p-8">
            <h2 className="text-2xl md:text-3xl font-bold mb-2">Top 3 of the Week</h2>
            <p className="text-sm md:text-base text-gray-600 mb-8">이번 주 가장 핫한 음악 TOP 3</p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {top3Data.map((item) => {
                    const slug = createSongSlug(item.title, item.artist)
                    return (
                        <Link
                            key={item.rank}
                            href={`/song/${slug}`}
                            className="relative rounded-2xl overflow-hidden shadow-lg aspect-square bg-cover bg-center hover:scale-105 transition-transform duration-300"
                            style={{ backgroundImage: `url('${item.imageUrl}')` }}
                        >
                            <div className="absolute inset-0 bg-linear-to-b from-transparent to-black/70" />
                            <div className="absolute top-4 left-4 bg-[#e91e63] text-white w-12 h-12 rounded-full flex items-center justify-center font-bold text-xl z-10">
                                #{item.rank}
                            </div>
                            <div className="absolute bottom-0 left-0 right-0 p-6 text-white z-10">
                                <div className="text-xl font-bold mb-1">{item.title}</div>
                                <div className="text-base opacity-90">{item.artist}</div>
                            </div>
                        </Link>
                    )
                })}
            </div>
        </section>
    )
}