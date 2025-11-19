export default function Header() {
    return (
        <header className="bg-gradient-to-br from-[#e91e63] to-[#f06292] text-white py-8">
            <div className="max-w-6xl mx-auto px-4 md:px-8">
                <div className="flex flex-col md:flex-row justify-between items-center mb-8 gap-4">
                    <div>
                        <div className="text-3xl">🎵</div>
                        <div className="text-xl md:text-2xl font-bold">Billboard Hot 100</div>
                        <div className="text-xs md:text-sm opacity-90 mt-1">The Week's Most Popular Songs</div>
                    </div>
                    <div className="text-sm md:text-base">2025년 11월 10일</div>
                </div>
                <div className="text-center mb-8">
                    <h1 className="text-3xl md:text-5xl font-bold mb-2">This Week's Top Hits</h1>
                    <p className="text-base md:text-lg opacity-95">전 세계 음악 팬들이 선택한 가장 인기 있는 곡들을 만나보세요</p>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto">
                    <div className="bg-white/20 backdrop-blur-md rounded-xl p-6 text-center">
                        <div className="text-3xl mb-2">📈</div>
                        <div className="text-4xl font-bold mb-1">100</div>
                        <div className="text-sm opacity-90">차트 순위</div>
                    </div>
                    <div className="bg-white/20 backdrop-blur-md rounded-xl p-6 text-center">
                        <div className="text-3xl mb-2">🎵</div>
                        <div className="text-4xl font-bold mb-1">52</div>
                        <div className="text-sm opacity-90">주간 업데이트</div>
                    </div>
                    <div className="bg-white/20 backdrop-blur-md rounded-xl p-6 text-center">
                        <div className="text-3xl mb-2">📅</div>
                        <div className="text-4xl font-bold mb-1">67</div>
                        <div className="text-sm opacity-90">역사 (년)</div>
                    </div>
                </div>
            </div>
        </header>
    )
}