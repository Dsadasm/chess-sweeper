export default async function uploadDailyRecord(
  name: string,
  point: number,
  time: string
) {
  const url = "http://127.0.0.1:8000/api/dailyrecords/";
  const body = JSON.stringify({ name: name, point: point, time: time });
  const response = await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: body,
  });
  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }
  const result = await response.json();
  return result;
}
