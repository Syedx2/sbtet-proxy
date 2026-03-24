export async function onRequest(context) {
  const url = new URL(context.request.url);
  
  const pin = url.searchParams.get('Pin') || '';
  const examMonthYearId = url.searchParams.get('ExamMonthYearId') || '';
  const examTypeId = url.searchParams.get('ExamTypeId') || '';
  const schemeId = url.searchParams.get('SchemeId') || '';
  const semYearId = url.searchParams.get('SemYearId') || '';
  const studentTypeId = url.searchParams.get('StudentTypeId') || '1';
  const type = url.searchParams.get('type') || 'results';

  let sbtetUrl = '';

  if (type === 'mid') {
    sbtetUrl = `https://sbtet.telangana.gov.in/api/api/Results/GetC18MidStudentWiseReport?ExamTypeId=${examTypeId}&Pin=${pin}&SchemeId=${schemeId}&SemYearId=${semYearId}`;
  } else if (type === 'attendance') {
    sbtetUrl = `https://sbtet.telangana.gov.in/api/api/PreExamination/getAttendanceReport?Pin=${pin}`;
  } else {
    sbtetUrl = `https://sbtet.telangana.gov.in/api/api/Results/GetStudentWiseReport?ExamMonthYearId=${examMonthYearId}&ExamTypeId=${examTypeId}&Pin=${pin}&SchemeId=${schemeId}&SemYearId=${semYearId}&StudentTypeId=${studentTypeId}`;
  }

  try {
    const res = await fetch(sbtetUrl, {
      signal: AbortSignal.timeout(30000),
      headers: {
        "User-Agent": "Mozilla/5.0",
        "Accept": "application/json"
      }
    });

    const data = await res.text();

    return new Response(data, {
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*"
      }
    });

  } catch (err) {
    return new Response(JSON.stringify({ error: err instanceof Error ? err.message : 'Unknown error' }), {
      status: 503,
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*"
      }
    });
  }
}