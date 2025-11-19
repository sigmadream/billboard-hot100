export default function Footer() {
    return (
        <footer className="bg-[#2c2c2c] text-gray-300 py-12">
            <div className="max-w-6xl mx-auto px-4 md:px-8">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
                    <div>
                        <h3 className="text-white mb-4 text-lg">Billboard Hot 100</h3>
                        <p className="text-sm leading-relaxed">1958년부터 시작된 세계에서 가장 권위 있는 음악 차트</p>
                    </div>
                    <div>
                        <h3 className="text-white mb-4 text-lg">차트 정보</h3>
                        <ul className="text-sm leading-relaxed list-none">
                            <li className="mb-2">매주 업데이트</li>
                            <li className="mb-2">스트리밍 + 판매 + 라디오 집계</li>
                            <li className="mb-2">전 세계 음악 트렌드 반영</li>
                        </ul>
                    </div>
                    <div>
                        <h3 className="text-white mb-4 text-lg">더 알아보기</h3>
                        <ul className="text-sm leading-relaxed list-none">
                            <li className="mb-2">
                                <a href="#" className="text-gray-300 no-underline hover:text-white transition-colors">
                                    Billboard 200
                                </a>
                            </li>
                            <li className="mb-2">
                                <a href="#" className="text-gray-300 no-underline hover:text-white transition-colors">
                                    Artist 100
                                </a>
                            </li>
                            <li className="mb-2">
                                <a href="#" className="text-gray-300 no-underline hover:text-white transition-colors">
                                    Global 200
                                </a>
                            </li>
                        </ul>
                    </div>
                </div>
                <div className="text-center pt-6 border-t border-gray-600 text-xs text-gray-500">
                    © 2025 Billboard Hot 100. All rights reserved.
                </div>
            </div>
        </footer>
    )
}