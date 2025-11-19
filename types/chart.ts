export interface Top3Item {
    rank: number
    title: string
    artist: string
    imageUrl: string
}

export interface ChartData {
    rank: number
    change: string
    changeColor: string
    imageUrl: string
    title: string
    artist: string
    peak: number
    weeks: number
}

export interface SongDetail {
    rank: number
    title: string
    artist: string
    chartDate: string
    currentPosition: number
    previousPosition: number | null
    peakPosition: number
    weeksOnChart: number
    imageUrl: string
}
