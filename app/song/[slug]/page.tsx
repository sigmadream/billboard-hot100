import { notFound } from 'next/navigation'
import { Metadata } from 'next'
import { getSongDetail, parseSongSlug, getLatestChartData, createSongSlug } from '@/lib/csvParser'
import { transformToSongDetail } from '@/lib/dataTransformer'
import Image from 'next/image'
import Link from 'next/link'

interface PageProps {
    params: Promise<{
        slug: string
    }>
}

/**
 * 정적 생성에 필요한 모든 slug를 생성하는 함수
 * output: export 모드에서 필수
 */
export async function generateStaticParams() {
    const latestData = getLatestChartData()
    
    return latestData.map((row) => ({
        slug: createSongSlug(row.title, row.performer),
    }))
}

export default async function SongDetailPage({ params }: PageProps) {
    // params를 await로 언래핑 (Next.js 15 이상)
    const { slug } = await params
    
    // slug에서 노래 정보 추출
    const songInfo = parseSongSlug(slug)
    
    if (!songInfo) {
        notFound()
    }
    
    // 노래 상세 정보 가져오기
    const csvRow = getSongDetail(songInfo.title, songInfo.artist)
    
    if (!csvRow) {
        notFound()
    }
    
    // 데이터 변환
    const songDetail = transformToSongDetail(csvRow)
    
    return (
        <div className="min-h-screen font-sans text-gray-900 leading-relaxed">
            {/* Header */}
            <header className="bg-gradient-to-br from-[#e91e63] to-[#f06292] text-white py-8">
                <div className="max-w-6xl mx-auto px-4 md:px-8">
                    <Link 
                        href="/" 
                        className="inline-block mb-4 text-white/90 hover:text-white transition-colors"
                    >
                        ← 홈으로 돌아가기
                    </Link>
                    <div className="text-3xl mb-2">🎵</div>
                    <div className="text-xl md:text-2xl font-bold">Billboard Hot 100</div>
                </div>
            </header>

            {/* Main Content */}
            <main className="max-w-4xl mx-auto px-4 md:px-8 py-12">
                <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
                    {/* 노래 이미지 */}
                    <div className="relative h-64 md:h-96 bg-gradient-to-br from-[#e91e63] to-[#f06292]">
                        <Image
                            src={songDetail.imageUrl}
                            alt={songDetail.title}
                            fill
                            className="object-cover opacity-80"
                        />
                        <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black/50" />
                        <div className="absolute bottom-0 left-0 right-0 p-8 text-white">
                            <div className="text-4xl md:text-5xl font-bold mb-2">
                                {songDetail.title}
                            </div>
                            <div className="text-xl md:text-2xl opacity-90">
                                {songDetail.artist}
                            </div>
                        </div>
                    </div>

                    {/* 노래 상세 정보 */}
                    <div className="p-8">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                            {/* 현재 순위 */}
                            <div className="bg-gray-50 rounded-xl p-6">
                                <div className="text-sm text-gray-600 mb-2">현재 순위</div>
                                <div className="text-4xl font-bold text-[#e91e63]">
                                    #{songDetail.currentPosition}
                                </div>
                            </div>

                            {/* 최고 순위 */}
                            <div className="bg-gray-50 rounded-xl p-6">
                                <div className="text-sm text-gray-600 mb-2">최고 순위</div>
                                <div className="text-4xl font-bold text-[#e91e63]">
                                    #{songDetail.peakPosition}
                                </div>
                            </div>

                            {/* 이전 순위 */}
                            <div className="bg-gray-50 rounded-xl p-6">
                                <div className="text-sm text-gray-600 mb-2">이전 순위</div>
                                <div className="text-4xl font-bold text-gray-700">
                                    {songDetail.previousPosition !== null 
                                        ? `#${songDetail.previousPosition}` 
                                        : 'NEW'}
                                </div>
                            </div>

                            {/* 차트 주수 */}
                            <div className="bg-gray-50 rounded-xl p-6">
                                <div className="text-sm text-gray-600 mb-2">차트 주수</div>
                                <div className="text-4xl font-bold text-gray-700">
                                    {songDetail.weeksOnChart}주
                                </div>
                            </div>
                        </div>

                        {/* 차트 날짜 */}
                        <div className="border-t pt-6">
                            <div className="text-sm text-gray-600 mb-2">차트 날짜</div>
                            <div className="text-lg font-semibold">
                                {new Date(songDetail.chartDate).toLocaleDateString('ko-KR', {
                                    year: 'numeric',
                                    month: 'long',
                                    day: 'numeric'
                                })}
                            </div>
                        </div>
                    </div>
                </div>
            </main>
        </div>
    )
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
    // params를 await로 언래핑 (Next.js 15 이상)
    const { slug } = await params
    const songInfo = parseSongSlug(slug)
    
    if (!songInfo) {
        return {
            title: '노래를 찾을 수 없습니다',
        }
    }
    
    return {
        title: `${songInfo.title} - ${songInfo.artist} | Billboard Hot 100`,
        description: `${songInfo.artist}의 "${songInfo.title}" 상세 정보를 확인하세요.`,
    }
}