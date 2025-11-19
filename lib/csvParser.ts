// lib/csvParser.ts
import fs from "fs";
import path from "path";

export interface CSVRow {
  chart_date: string;
  current_position: string;
  title: string;
  performer: string;
  previous_position: string;
  peak_position: string;
  weeks_on_chart: string;
}

/**
 * CSV 파일을 읽어서 파싱하는 함수
 * @param filePath CSV 파일 경로
 * @returns 파싱된 CSV 데이터 배열
 */
export function parseCSV(filePath: string): CSVRow[] {
  const fullPath = path.join(process.cwd(), filePath);
  const fileContent = fs.readFileSync(fullPath, "utf-8");
  const lines = fileContent.split("\n").filter((line) => line.trim() !== "");

  if (lines.length === 0) {
    return [];
  }

  // 헤더 추출
  const headers = lines[0].split(",").map((h) => h.trim());

  // 데이터 행 파싱
  const rows: CSVRow[] = [];
  for (let i = 1; i < lines.length; i++) {
    const values = parseCSVLine(lines[i]);
    if (values.length === headers.length) {
      const row: any = {};
      headers.forEach((header, index) => {
        row[header] = values[index] || "";
      });
      rows.push(row as CSVRow);
    }
  }

  return rows;
}

/**
 * CSV 라인을 파싱하는 함수 (쉼표로 구분, 따옴표 처리)
 */
function parseCSVLine(line: string): string[] {
  const result: string[] = [];
  let current = "";
  let inQuotes = false;

  for (let i = 0; i < line.length; i++) {
    const char = line[i];

    if (char === '"') {
      inQuotes = !inQuotes;
    } else if (char === "," && !inQuotes) {
      result.push(current.trim());
      current = "";
    } else {
      current += char;
    }
  }

  result.push(current.trim());
  return result;
}

/**
 * 특정 날짜의 차트 데이터를 가져오는 함수
 * @param date 날짜 (YYYY-MM-DD 형식)
 * @returns 해당 날짜의 차트 데이터
 */
export function getChartDataByDate(date: string): CSVRow[] {
  const allData = parseCSV("data/hot100_archive_1958_2021.csv");
  return allData.filter((row) => row.chart_date === date);
}

/**
 * 최신 차트 데이터를 가져오는 함수
 * @returns 가장 최근 날짜의 차트 데이터 (상위 100개)
 */
export function getLatestChartData(): CSVRow[] {
  const allData = parseCSV("data/hot100_archive_1958_2021.csv");

  // 날짜별로 그룹화하여 최신 날짜 찾기
  const dates = [...new Set(allData.map((row) => row.chart_date))]
    .sort()
    .reverse();
  const latestDate = dates[0];

  // 최신 날짜의 데이터를 순위순으로 정렬
  const latestData = allData
    .filter((row) => row.chart_date === latestDate)
    .sort((a, b) => parseInt(a.current_position) - parseInt(b.current_position))
    .slice(0, 100);

  return latestData;
}

/**
 * 특정 노래의 상세 정보를 가져오는 함수
 * @param title 노래 제목
 * @param artist 아티스트 이름
 * @param date 차트 날짜 (선택사항, 없으면 최신 날짜 사용)
 * @returns 노래 상세 정보 또는 null
 */
export function getSongDetail(
  title: string,
  artist: string,
  date?: string
): CSVRow | null {
  const allData = parseCSV('data/hot100_archive_1958_2021.csv')

  // 날짜가 지정되지 않으면 최신 날짜 사용
  let targetDate = date
  if (!targetDate) {
    const dates = [...new Set(allData.map(row => row.chart_date))].sort().reverse()
    targetDate = dates[0]
  }

  // 제목과 아티스트로 노래 찾기 (대소문자 무시)
  const song = allData.find(
    row =>
      row.chart_date === targetDate &&
      row.title.toLowerCase().trim() === title.toLowerCase().trim() &&
      row.performer.toLowerCase().trim() === artist.toLowerCase().trim()
  )

  return song || null
}

/**
* 노래 제목과 아티스트로 URL 친화적인 slug 생성
* @param title 노래 제목
* @param artist 아티스트 이름
* @returns URL slug
*/
export function createSongSlug(title: string, artist: string): string {
  const titleSlug = title
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '')
  const artistSlug = artist
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '')
  return `${titleSlug}-${artistSlug}`
}

/**
* slug에서 노래 제목과 아티스트 추출
* @param slug URL slug
* @returns { title: string, artist: string } 또는 null
*/
export function parseSongSlug(slug: string): { title: string; artist: string } | null {
  // slug 형식: "title-artist"
  // 마지막 하이픈을 기준으로 분리 (아티스트 이름에도 하이픈이 있을 수 있음)
  // 간단한 방법: 모든 노래 데이터를 순회하며 slug와 일치하는 것 찾기
  const allData = parseCSV('data/hot100_archive_1958_2021.csv')

  // 최신 날짜의 데이터만 사용
  const dates = [...new Set(allData.map(row => row.chart_date))].sort().reverse()
  const latestDate = dates[0]
  const latestData = allData.filter(row => row.chart_date === latestDate)

  // slug와 일치하는 노래 찾기
  for (const row of latestData) {
    const rowSlug = createSongSlug(row.title, row.performer)
    if (rowSlug === slug) {
      return {
        title: row.title,
        artist: row.performer
      }
    }
  }

  return null
}