// app/page.tsx
import ChartsSection from '@/components/ChartsSection'
import Footer from '@/components/Footer'
import Header from '@/components/Header'
import Top3Section from '@/components/Top3Section'
import { getLatestChartData } from '@/lib/csvParser'
import { transformToTop3, transformToChartData } from '@/lib/dataTransformer'

export default function Home() {
  // 빌드 타임에 CSV 데이터 로드
  const csvData = getLatestChartData()
  const top3Data = transformToTop3(csvData)
  const chartsData = transformToChartData(csvData)

  return (
    <div className="min-h-screen font-sans text-gray-900 leading-relaxed">
      <Header />
      <main className="max-w-6xl mx-auto px-4 md:px-8 py-12 bg-white">
        <Top3Section top3Data={top3Data} />
        <ChartsSection chartsData={chartsData} />
      </main>
      <Footer />
    </div>
  )
}