// lib/dataTransformer.ts
import { CSVRow } from './csvParser'
import { ChartData, Top3Item } from '@/types/chart'

/**
 * CSV 데이터를 Top3Item 형식으로 변환
 */
export function transformToTop3(csvRows: CSVRow[]): Top3Item[] {
  const top3 = csvRows
    .slice(0, 3)
    .map((row, index) => ({
      rank: parseInt(row.current_position),
      title: row.title,
      artist: row.performer,
      imageUrl: `https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=400&h=400&fit=crop&sig=${index}` // 플레이스홀더 이미지
    }))

  return top3
}

/**
 * CSV 데이터를 ChartData 형식으로 변환
 */
export function transformToChartData(csvRows: CSVRow[]): ChartData[] {
  return csvRows.slice(3).map((row) => {
    const currentPos = parseInt(row.current_position)
    const prevPos = row.previous_position === 'NA' ? null : parseInt(row.previous_position)

    let change = 'NEW'
    let changeColor = 'text-blue-600'

    if (prevPos !== null) {
      const diff = prevPos - currentPos
      if (diff > 0) {
        change = `+${diff}`
        changeColor = 'text-green-600'
      } else if (diff < 0) {
        change = `${diff}`
        changeColor = 'text-red-600'
      } else {
        change = '-'
        changeColor = 'text-gray-600'
      }
    }

    return {
      rank: currentPos,
      change,
      changeColor,
      imageUrl: `https://images.unsplash.com/photo-1470225620780-dba8ba36b745?w=100&h=100&fit=crop&sig=${currentPos}`,
      title: row.title,
      artist: row.performer,
      peak: parseInt(row.peak_position),
      weeks: parseInt(row.weeks_on_chart)
    }
  })
}


import { SongDetail } from '@/types/chart'

/**
 * CSV 데이터를 SongDetail 형식으로 변환
 */
export function transformToSongDetail(csvRow: CSVRow): SongDetail {
  return {
    rank: parseInt(csvRow.current_position),
    title: csvRow.title,
    artist: csvRow.performer,
    chartDate: csvRow.chart_date,
    currentPosition: parseInt(csvRow.current_position),
    previousPosition: csvRow.previous_position === 'NA'
      ? null
      : parseInt(csvRow.previous_position),
    peakPosition: parseInt(csvRow.peak_position),
    weeksOnChart: parseInt(csvRow.weeks_on_chart),
    imageUrl: `https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=800&h=800&fit=crop&sig=${csvRow.title.length}`
  }
}