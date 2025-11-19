import { ChartData, Top3Item } from "@/types/chart"

export const top3Data: Top3Item[] = [
    {
        rank: 1,
        title: 'Anti-Hero',
        artist: 'Taylor Swift',
        imageUrl: 'https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=400&h=400&fit=crop'
    },
    {
        rank: 1,
        title: 'Anti-Hero',
        artist: 'Taylor Swift',
        imageUrl: 'https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=400&h=400&fit=crop'
    },
    {
        rank: 1,
        title: 'Anti-Hero',
        artist: 'Taylor Swift',
        imageUrl: 'https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=400&h=400&fit=crop'
    },
    // ... 나머지 데이터
]

export const chartsData: ChartData[] = [
    {
        rank: 4,
        change: '+1',
        changeColor: 'text-green-600',
        imageUrl: 'https://images.unsplash.com/photo-1470225620780-dba8ba36b745?w=100&h=100&fit=crop',
        title: 'Calm Down',
        artist: 'Rema & Selena Gomez',
        peak: 3,
        weeks: 18
    }
    // ... 나머지 데이터
]